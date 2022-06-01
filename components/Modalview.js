import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, Alert } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const Modalview = ({onpresshandlers}) => {
    const {updateblog, deleteblog, closemodal} = onpresshandlers
    
    return( 
        <View style={[tw`flex-1 justify-center items-center`, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
            <View style={[tw`bg-white w-5/6 p-2 rounded-xl shadow-2xl`]}>
                <TouchableOpacity 
                    style={[tw`rounded-xl p-1 self-center w-5/6 my-2`, {backgroundColor: 'rgb(14,165,233)'}]}
                    onPress={updateblog}
                >
                    <Text style={[tw`text-center text-white`, {fontFamily:'Lobster-Regular', fontSize: 20}]}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[tw`rounded-xl p-1 self-center w-5/6 my-2`, {backgroundColor: 'rgb(14,165,233)'}]}
                    onPress={deleteblog}
                >
                    <Text style={[tw`text-center text-white`, {fontFamily:'Lobster-Regular', fontSize: 20}]}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[tw`rounded-xl p-1 self-center w-5/6 my-2`, {backgroundColor: 'rgb(14,165,233)'}]}
                    onPress={closemodal}
                >
                    <Text style={[tw`text-center text-white`, {fontFamily:'Lobster-Regular', fontSize: 20}]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Modalview;
