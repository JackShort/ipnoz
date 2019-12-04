import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";

export default class WeWorkScreen extends React.Component {
  static navigationOptions = 
  {
    title: "WeWork Portfolio"
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>WeWork</Text>
          <Image
            source={
              __DEV__
                ? require("../assets/images/we_work.png")
                : require("../assets/images/robot-prod.png")
            }
            style={styles.welcomeImage}
          />
        </View>
        <ScrollView>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam
            non nisi est sit amet. Ut sem viverra aliquet eget. Quis enim
            lobortis scelerisque fermentum dui faucibus in. Nibh venenatis cras
            sed felis eget velit aliquet. Vitae justo eget magna fermentum
            iaculis. Ultricies tristique nulla aliquet enim tortor at auctor
            urna. Urna porttitor rhoncus dolor purus non enim praesent
            elementum. Vel elit scelerisque mauris pellentesque pulvinar. Vel
            elit scelerisque mauris pellentesque pulvinar pellentesque habitant.
            Lobortis feugiat vivamus at augue eget. Enim eu turpis egestas
            pretium aenean pharetra magna. Iaculis urna id volutpat lacus
            laoreet non curabitur gravida arcu. Nec sagittis aliquam malesuada
            bibendum arcu vitae elementum. Nunc sed augue lacus viverra vitae
            congue eu consequat ac. Ullamcorper eget nulla facilisi etiam. Fusce
            ut placerat orci nulla pellentesque dignissim enim sit. Id interdum
            velit laoreet id donec ultrices tincidunt arcu. Ac placerat
            vestibulum lectus mauris ultrices eros. Lectus magna fringilla urna
            porttitor rhoncus dolor purus non. Adipiscing bibendum est ultricies
            integer quis auctor elit sed vulputate. Quam pellentesque nec nam
            aliquam sem et tortor consequat. Sit amet risus nullam eget felis
            eget nunc lobortis mattis. Turpis egestas maecenas pharetra
            convallis posuere morbi. Dictum fusce ut placerat orci nulla.
            Pellentesque diam volutpat commodo sed egestas egestas fringilla.
            Interdum velit euismod in pellentesque massa placerat duis ultricies
            lacus. Fringilla est ullamcorper eget nulla facilisi etiam
            dignissim. Pretium nibh ipsum consequat nisl vel pretium lectus.
            Cursus mattis molestie a iaculis at erat pellentesque adipiscing
            commodo. Nisi quis eleifend quam adipiscing vitae. Est pellentesque
            elit ullamcorper dignissim. Senectus et netus et malesuada fames ac
            turpis egestas. Lectus arcu bibendum at varius vel pharetra. Turpis
            in eu mi bibendum neque egestas congue quisque egestas. Massa
            tincidunt dui ut ornare lectus. Orci nulla pellentesque dignissim
            enim sit amet venenatis urna. In nibh mauris cursus mattis molestie
            a iaculis at erat. Auctor eu augue ut lectus. Risus pretium quam
            vulputate dignissim suspendisse. Magna sit amet purus gravida quis
            blandit. Integer quis auctor elit sed vulputate mi sit amet mauris.
            Consequat mauris nunc congue nisi vitae suscipit. Dui sapien eget mi
            proin sed libero enim sed. Est velit egestas dui id ornare arcu.
            Integer eget aliquet nibh praesent tristique magna sit. Eget magna
            fermentum iaculis eu. Sed sed risus pretium quam. Fermentum iaculis
            eu non diam phasellus vestibulum lorem. In vitae turpis massa sed
            elementum tempus egestas. Adipiscing elit duis tristique
            sollicitudin nibh sit amet. Turpis tincidunt id aliquet risus
            feugiat. Dignissim sodales ut eu sem integer. Nisi est sit amet
            facilisis magna etiam tempor orci. Sed adipiscing diam donec
            adipiscing tristique. Sit amet consectetur adipiscing elit
            pellentesque habitant morbi tristique. Ridiculus mus mauris vitae
            ultricies leo integer malesuada. Imperdiet nulla malesuada
            pellentesque elit eget gravida cum.
          </Text>
        </ScrollView>
        <View style={styles.investGroup}>
          <Button
            onPress={() => {
              alert("Congrats! You are now an investor! If you didn't have enough money in your account to make this transaction that's ok, we'll cover it. You'll just owe us the balance at a low low interest rate of 6% daily!");
            }}
            title="Invest 10k RussBucks"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 300,
    height: 240,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
    alignSelf: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  subText: {
    fontSize: 21,
    color: "rgba(96,100,109, 0.8)",
    textAlign: "center"
  },
  top: {
    backgroundColor: "#fff"
  },
  money: {
    flex: 1,
    backgroundColor: "#fff"
  },
  addMoney: {
    flex: 3,
    backgroundColor: "#fff"
  },
  investGroup: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 3,
    borderRadius: 10,
      borderWidth: 3,
      borderColor: '#8c90c3',

  },
  investText: {
    fontSize: 15,
    width: 200,
    color: "rgba(96,100,109, 0.8)"
  },
  investTextEnd: {
    fontSize: 15,
    color: "#CB3438"
  },
  investTextEndGood: {
    fontSize: 15,
    color: "#52C43B"
  }
});