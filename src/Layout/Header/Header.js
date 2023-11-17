import { StyleSheet, View, Text, Platform} from 'react-native';
export default Header = (props) =>{
    // console.log("width", props.width, "height", props.height)
    const styles = StyleSheet.create({
        Header:{
            height:Platform.OS === 'ios' ? 124 : 84,
            width:props.width,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        Header_h1:{
            fontSize:28,
            fontWeight: 'bold'
        },
    })
    return(
        <View style={styles.Header}>
            <Text style={styles.Header_h1}>
                HỆ THỐNG GIÁM SÁT KHÍ GAS
            </Text>
        </View>
    )
}