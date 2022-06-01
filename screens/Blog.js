import React, {useState, useEffect} from 'react';
import { View, Text, Image, StatusBar, Dimensions, ScrollView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const Blog = ({ route, navigation }) => {
    const [blog, setblog] = useState({});
    const blogid = route.params.blogid

    const getblog = ()=>{
        firestore().collection('userblogs')
        .doc(auth().currentUser.uid)
        .collection('blogs')
        .doc(blogid)
        .get()
        .then((snapshot)=>{
           setblog(snapshot.data())
        })
    }

    useEffect(() => {
      getblog()
    }, []);

    return (
        <ScrollView style={[tw`bg-white flex-1`]}>
            <StatusBar hidden/>
            {
                blog.coverimage ?
                <Image
                    source={{ uri: blog.coverimage }}
                    style={{width: Dimensions.get('screen').width, height:200}}
                />
                : null
            }
            <Text style={[tw`p-1 m-1 text-black text-center`, {fontFamily:'Lobster-Regular', fontSize: 36}]}>{blog.title}</Text>
            <Text style={[tw`mx-1 flex-1 flex-wrap`, {fontFamily:'Lobster-Regular', fontSize: 20}]}>{blog.content}</Text>
        </ScrollView>
    );
};

export default Blog;
