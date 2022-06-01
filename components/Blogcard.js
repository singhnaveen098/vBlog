import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, Alert, TouchableWithoutFeedback, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import tw from 'tailwind-react-native-classnames'

const Blogcard = (props) => {
    const {title, coverimage} = props.blogdata.item
    const {openmodal, gotoblog} = props

    return( 
        <TouchableOpacity
            style={[tw`bg-white my-2`, {width: Dimensions.get('screen').width/1.25, height:200}]}
            onPress={()=>gotoblog(props.blogdata.item.id)}
        >
            <TouchableWithoutFeedback>
                <Ionicons
                    name='ios-ellipsis-vertical-circle'
                    size={32}
                    color='white'
                    style={[tw`absolute top-2 right-2 z-10`]}
                    onPress={()=> openmodal(props.blogdata.item.id)}
                />
            </TouchableWithoutFeedback>
            <View style={[tw`h-full w-full`]}>
                <Image
                    style={[tw` w-full h-full rounded-xl`, {resizeMode: 'cover'}]}
                    source={{uri: coverimage}}
                />
                <Text style={[tw`p-1 absolute bottom-0 text-white rounded-b-xl w-full`, {fontFamily:'Lobster-Regular', fontSize: 26, backgroundColor: 'rgba(0,0,0,0.5)'}]}>{(title.length)<40 ? title:title.slice(0,40)+'....'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Blogcard;
