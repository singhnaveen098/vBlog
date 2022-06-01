import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Createblog = ({navigation}) => {
    const [title, settitle] = useState();
    const [content, setcontent] = useState();
    const [coverimg, setcoverimg] = useState(null);
    const uid = auth().currentUser.uid

    const onuploadimage = ()=>{
        launchImageLibrary({
            mediaType:'photo'
        }, (data)=> setcoverimg(data.assets[0].uri))
    }

    const uploadcoverimg = async(uid)=>{
        const splitpath = coverimg.split('/')
        const imagename = splitpath[splitpath.length - 1]
        const reference = storage().ref(`${uid}/images/${imagename}`)
        const data = await reference.putFile(coverimg)
        return await storage().ref(data.metadata.fullPath).getDownloadURL()
    }

    const saveblog = async()=>{
        if(!title || !content){
            Alert.alert(
                'Something went wrong',
                'Enter all details!!!!'
            )
            return
        }
        navigation.navigate('Home')

        try{
            const downloadurl = await uploadcoverimg(uid)

            firestore().collection('userblogs')
            .doc(uid)
            .collection('blogs')
            .add({
                title,
                content,
                coverimage: downloadurl,
                createdAt: firestore.FieldValue.serverTimestamp()
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <ScrollView style={[tw`bg-white flex-1`]} keyboardShouldPersistTaps={'always'}>
            <Text style={[tw`p-1 m-1 text-black text-center`, {fontFamily:'Lobster-Regular', fontSize: 36}]}>Create Blog</Text>
            <View>
                <Text style={[tw`m-2 text-lg text-black`]}>Title</Text>
                <TextInput
                    multiline={true}
                    onChangeText={(text)=>settitle(text)}
                    numberOfLines={2}
                    style={[tw`border-2 rounded-md p-2 m-2 text-lg`, {borderColor:'gray', textAlignVertical:'top'}]}
                />
            </View>
            <View>
                <Text style={[tw`m-2 text-lg text-black`]}>Content</Text>
                <TextInput
                    multiline={true}
                    onChangeText={(text)=>setcontent(text)}
                    numberOfLines={10}
                    underlineColorAndroid='transparent'
                    style={[tw`border-2 rounded-md p-2 m-2 text-lg`, {borderColor:'gray', textAlignVertical:'top'}]}
                />
            </View>
            <View style={[tw`flex-col items-center m-2`]}>
                <Image
                    style={[tw`w-11/12 my-2`, {height:250, display:coverimg?'flex':'none'}]}
                    source={{uri: coverimg}}
                    resizeMode='cover'
                />
                <TouchableOpacity
                    style={[tw`rounded-xl p-1 items-center justify-center w-4/5 my-2`, {backgroundColor: 'rgb(14,165,233)'}]}
                    onPress={onuploadimage}
                >
                    <Text style={[tw`text-center text-white`, {fontFamily:'Lobster-Regular', fontSize: 20}]}>Upload Cover Image</Text>
                </TouchableOpacity>
            </View>
            <FontAwesome
                name='save'
                color='rgb(14,165,233)'
                size={44}
                style={[tw`absolute top-2 right-2`, {elevation:10}]}
                onPress={saveblog}
            />
        </ScrollView>
    );
};

export default Createblog;
