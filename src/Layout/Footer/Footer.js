import { StyleSheet, View, Text, Image} from 'react-native';
export default Footer = (props) =>{
    // console.log("width", props.width, "height", props.height)
    const styles = StyleSheet.create({
        Footer:{
            height:128,
            width:props.width,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        Footer_info:{
            width:'100%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:8
        },
        Footer_info_logo:{
            paddingRight:16
        },
        Footer_info_name:{
            paddingLeft:16
        },
        Footer_text:{
            fontSize: 16,
        },
        tinyLogo:{
            width:60,
            height:60,
            borderRadius: 100,
        },
    })
    return(
        <View style={styles.Footer}>
            <View style={styles.Footer_info}>
                <View style={styles.Footer_info_name}>
                    <Text style>Trường Đại Học Sư Phạm Kỹ Thuật - Tp.HCM</Text>
                    <Text>Giáo viên hướng dẫn: ThS.Ngô Bá Việt</Text>
                    <Text>Nhóm thực hiện: Nhóm 1</Text>
                </View>
                <View style={styles.Footer_info_logo}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../images/icon.png')}
                />
                </View>
            </View>
            <Text>Designed by: Võ Minh Thuận</Text>
        </View>
    )
}
