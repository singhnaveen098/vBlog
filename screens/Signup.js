import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, Alert } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Signup = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [displaypicture, setdisplaypicture] = useState();

    const selectpic = ()=>{
        launchImageLibrary({
            mediaType:'photo'
        }, (data)=> setdisplaypicture(data.assets[0].uri))
        .catch((error)=>console.log(error))
    }
    const clickpic = ()=>{
        launchCamera({
            mediaType:'photo'
        }, (data)=> setdisplaypicture(data.assets[0].uri))
        .catch((error)=>console.log(error))
    }
    const onsignup = async ()=>{
        if(!name || !email || !password){
            Alert.alert(
                'Something went wrong',
                'Enter all details!!!!'
            )
            return
        }
        try{
            const {user: {uid}} = await auth().createUserWithEmailAndPassword(email, password)
            let downloadurl = null
            if(displaypicture){
                const splitpath = displaypicture.split('/')
                const imagename = splitpath[splitpath.length - 1]
                const reference = storage().ref(`${uid}/images/${imagename}`)
                const data = await reference.putFile(displaypicture)
                downloadurl = await storage().ref(data.metadata.fullPath).getDownloadURL() 
            }
            firestore().collection('users')
            .doc(uid)
            .set({
                email,
                name,
                displaypicture: downloadurl
            })
            .then(console.log('Done'))
        }catch(error){
            Alert.alert(
                'Something went wrong',
                'The email address is already in use by another account.'
            )
        }
    }

    return (
        <View style={[tw`flex-1 justify-center items-center bg-white`]}>
            <View style={[tw`m-1`]}>
                <Text style={[tw``, {fontFamily:'Lobster-Regular', fontSize: 36, color:'black'}]}>SignUp</Text>
            </View>
            <Image
                source={{uri: displaypicture? displaypicture : null}}
                style={[tw`w-28 h-28 rounded-full my-2 bg-gray-500`]}
            />
            <View style={[tw`flex-row m-2 w-3/5 justify-between`]}>
                <TouchableOpacity 
                    style={[tw`rounded-xl p-2 self-center my-2`, { backgroundColor: 'rgb(14,165,233)' }]}
                    onPress={selectpic}
                >
                    <Text style={[tw`text-center text-white`, { fontFamily: 'Lobster-Regular', fontSize: 20 }]}>select picture</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[tw`rounded-xl p-2 self-center my-2`, { backgroundColor: 'rgb(14,165,233)' }]}
                    onPress={clickpic}
                >
                    <Text style={[tw`text-center text-white`, { fontFamily: 'Lobster-Regular', fontSize: 20 }]}>click picture</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                value={name}
                placeholder='Name'
                onChangeText={(text)=> setname(text)}
                style={[tw`w-4/5 border-2 rounded-md my-2 p-2 border-b text-lg`]}
            />
            <TextInput
                value={email}
                placeholder='Email'
                onChangeText={(text)=> setemail(text)}
                style={[tw`w-4/5 border-2 rounded-md my-2 p-2 border-b text-lg`]}
            />
            <TextInput
                value={password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text)=> setpassword(text)}
                style={[tw`w-4/5 border-2 rounded-md my-2 p-2 border-b text-lg`]}
            />
            <TouchableOpacity
                style={[tw`rounded-xl p-1 self-center w-2/6 my-4`, { backgroundColor: 'rgb(14,165,233)' }]}
                onPress={onsignup}
            >
                <Text style={[tw`text-center text-white`, { fontFamily: 'Lobster-Regular', fontSize: 25 }]}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;
