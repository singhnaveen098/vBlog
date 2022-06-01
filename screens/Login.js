import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, Alert } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import auth from '@react-native-firebase/auth'

const Login = () => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const onlogin = async () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => console.log(error))
    }
    return (
        <View style={[tw`flex-1 justify-center items-center bg-white`]}>
            <View style={[tw`m-1`]}>
                <Text style={[tw``, { fontFamily: 'Lobster-Regular', fontSize: 36, color: 'black' }]}>Login</Text>
            </View>
            <TextInput
                value={email}
                placeholder='Email'
                onChangeText={(text) => setemail(text)}
                style={[tw`w-4/5 border-2 rounded-md my-2 p-2 border-b text-lg`]}
            />
            <TextInput
                value={password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text) => setpassword(text)}
                style={[tw`w-4/5 border-2 rounded-md my-2 p-2 border-b text-lg`]}
            />
            <TouchableOpacity
                style={[tw`rounded-xl p-1 self-center w-2/6 my-4`, { backgroundColor: 'rgb(14,165,233)' }]}
                onPress={onlogin}
            >
                <Text style={[tw`text-center text-white`, { fontFamily: 'Lobster-Regular', fontSize: 25 }]}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
