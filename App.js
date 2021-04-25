import React,{useState} from 'react'
import{StyleSheet,View,Text,Image,TouchableOpacity,Button} from 'react-native'
import {RNCamera} from 'react-native-camera'

const PendingView = ()=>(
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30,color:'red'}}>Loading....</Text>
  </View>
)
const App = () => {
  const [image,setImage] = useState(null)
  
  const takePicture = async (camera) => {
    try {
      const options = {quality:0.9, base64:false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)

    } catch (error) {
      console.warn(error)
    }
  }
  return(
    <View style={styles.container}>
        {image ? (
          <View style={styles.preview}>
            <Text style={styles.camText}>Here is your profile</Text>
            <Image style={styles.clicked} source={{uri: image, width:'100%', height:'80%'}} />
              <View style={styles.button}>
              <Button title='Click Photo' onPress={() => {setImage(null) }} />
              </View>

          </View>
        ) : (
          <RNCamera style={styles.preview} type={RNCamera.Constants.Type.back} captureAudio={false} flashMode={RNCamera.Constants.FlashMode.on} androidCameraPermissionOptions={{
            title:'Permission to use camera',
            message:'Longet text to use camera',
            buttonPositive:"Ok",
            buttonNegative:'Cancel'
          }}
          androidRecordAudioPermissionOptions={{
            title:'Permission to use audio',
            message:'Longet text to use audio',
            buttonPositive:"Ok",
            buttonNegative:'Cancel'
          }}
          >
            {({camera,status}) =>{
              if(status !== 'READY') return <PendingView />
              return (
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                    <Text>Snap</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          </RNCamera>
        )}
    </View>
  )
}

export default App

const styles  = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#0a798f'
  },
  preview:{
    flex:1,
    alignItems:'center'
  },
  capture:{
    flex:0,
    backgroundColor:'orange',
    padding:20,
    justifyContent:'center',
    alignItems:'center'
  },
  camText:{
    backgroundColor:'powderblue',
    width:'100%',
    color:'#fff',
    marginBottom:10,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:20,
    fontSize:25
  },
  clicked:{
    width:300,
    height:300,
    borderRadius:150,
  },
  button:{
    marginTop:50
  }
})