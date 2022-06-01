import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from'react-native-vector-icons/Octicons'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import Modalview from '../components/Modalview';
import Blogcard from '../components/Blogcard';

const Home = ({navigation}) => {
    const [blogs, setblogs] = useState([]);
    const [modaldisp, setmodaldisp] = useState(false);
    const [selectedcardid, setselectedcardid] = useState();

    const getblogs = ()=>{
        firestore().collection('userblogs')
        .doc(auth().currentUser.uid)
        .collection('blogs')
        .onSnapshot((snapshot)=>{
            const data = []
            snapshot.forEach((doc)=>{
                data.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setblogs(data)
        })
    }

    useEffect(() => {
      getblogs()
    },[]);
    
    const openmodal = (cardid)=>{
        setmodaldisp(true)
        setselectedcardid(cardid)
    }

    const closemodal = ()=>{
        setmodaldisp(false)
        setselectedcardid(null)
    }

    const gotoblog = (blogid)=>{
        navigation.navigate('Blog',{
            blogid
        })
    }

    const updateblog = ()=>{
        navigation.navigate('Update Blog',{
            blogid:selectedcardid
        })
        setmodaldisp(false)
        setselectedcardid(null)
    }

    const deletefromstorage = (id)=>{
        firestore().collection('userblogs')
        .doc(auth().currentUser.uid)
        .collection('blogs')
        .doc(id)
        .get()
        .then((snapshot)=>{
            const image = snapshot.data().coverimage
            const splitpath = image.split('%2F')
            const imgpath = splitpath[splitpath.length-1].split('?')
            const reference = storage().ref(`${auth().currentUser.uid}/images/${imgpath[0]}`)
            reference.delete()
        })
    }

    const deleteblog = ()=>{
        setmodaldisp(false)
        deletefromstorage(selectedcardid)
        firestore().collection('userblogs')
        .doc(auth().currentUser.uid)
        .collection('blogs')
        .doc(selectedcardid)
        .delete()
        .catch((error)=>console.log(error))
        setselectedcardid(null)
    }

    const signout = ()=>{
        auth().signOut()
    }

    return (
        <View style={[tw`flex-1 items-center bg-white`]}>
            <Modal
                visible={modaldisp}
                animationType='fade'
                transparent={true}
            >
                <Modalview
                    onpresshandlers={{
                        updateblog, deleteblog, closemodal
                    }}
                />
            </Modal>
            <View style={[tw`m-1`]}>
                <Text style={[tw``, {fontFamily:'Lobster-Regular', fontSize: 36, color:'black'}]}>My Blogs</Text>
            </View>
            <Octicons
                style={[tw`absolute top-3 z-20 right-2`]}
                name='sign-out'
                size={40}
                color='black'
                onPress={signout}
            />
            <Ionicons
                style={[tw`absolute bottom-2 z-20 right-2`]}
                name='add-circle-sharp'
                size={69}
                color='black'
                onPress={()=>navigation.navigate('Create Blog')}
            />
            <View style={[tw`items-center`]}>
                <FlatList 
                    data={blogs}
                    keyExtractor={(item)=>item.id}
                    renderItem={(item)=>{
                        return(
                            <Blogcard blogdata={item} openmodal={openmodal} gotoblog={gotoblog}/>
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default Home;
