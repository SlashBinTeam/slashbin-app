import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  //Text,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Button } from "galio-framework";
import { Text } from "galio-framework";

export default Info = ({ setInfo }) => {
  const infoAnim = useRef(new Animated.Value(Dimensions.get("screen").width))
    .current;

  useEffect(() => {
    Animated.timing(infoAnim, {
      toValue: 0,
      easing: Easing.bounce,
      duration: 800,
    }).start();
  }, []);

  const goBack = () => {
    Animated.timing(infoAnim, {
      toValue: Dimensions.get("screen").width,
      easing: Easing.bounce,
      duration: 800,
    }).start(() => setInfo(0));
    // setInfo(0);
  };
  return (
    <Animated.View
      style={{
        ...styles.container,
        // transform: [{ scaleY: infoAnim }, { scaleX: infoAnim }],
        marginLeft: infoAnim,
      }}
    >
      <ScrollView bounces={false}>
        <SafeAreaView>
          <View style={styles.paragraph}>
            <Text style={styles.title}>Info</Text>
            <Text style={styles.text}>
              ./bin è un'applicazione che tramite intelligenza artificiale e
              machine learning permette agli utenti di scansionare un oggetto e
              di sapere in tempo reale dove dovrà essere buttato.
            </Text>

            <Text style={styles.text}>
              Questo è un progetto creato da tre studenti del Politecnico di
              Milano per aiutare a combattere i cambiamenti climatici. Crediamo
              che l’intelligenza artificiale sia un’arma ancora tropo poco
              utilizzata. Vogliamo semplificare il processo di smaltimento dei
              rifiuti dalla sua base cioè dal consumatore. Poiché alle volte la
              raccolta differenziata è un processo poco intuitivo per i più,
              siamo convinti che la digitalizzazione sia la chiave per renderla
              più semplice e divertente.
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text style={styles.title}>Utilizzo</Text>
            <Text style={styles.text}>
              Poiché la raccolta differenziata di alcuni elementi tra i quali
              Tetrapak e Alluminio varia da comune a comune ./bin mostrerà il
              canale di smaltimento più comune sul territorio nazionale (esempio
              carta per tetrapak e plastica per alluminio). Con l’obiettivo di
              riuscire in future versioni a personalizzare l’esperienza in base
              alla posizione dell’utente. Inoltre ricordiamo che bottiglie e
              contenitori vanno puliti prima di essere buttati nell’apposito
              contenitore.
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text style={styles.title}>Disclaimer</Text>
            <Text style={styles.text}>
              L’applicazione deve essere vista solo come un aiuto, la scelta
              finale di dove buttare un prodotto è lasciata al singolo
              consumatore perciò non ci assumiamo nessuna responsabilità di
              eventuali errori di differenziazione. Detto ciò confidiamo nella
              nostra tecnologia e siamo sicuri che con il tempo andrà sempre più
              a migliorarsi. Le immagini scansionate dagli utenti saranno usate
              dal server per migliorare gli algoritmi senza intaccare la privacy
              dei singoli utenti in alcun modo.
            </Text>
          </View>
          <View style={{ height: 90 }}></View>
        </SafeAreaView>
      </ScrollView>
      <Button
        round
        uppercase
        color="#27ae60"
        style={styles.button}
        onPress={goBack}
      >
        <Text
          style={{ fontFamily: "rubik-bold", fontSize: 20, color: "white" }}
        >
          torna alla home
        </Text>
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    alignItems: "center",
    zIndex: 100,
    paddingTop: 50,
  },
  paragraph: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    fontFamily: "rubik-bold",
    fontSize: 35,
  },
  text: {
    fontSize: 18,
  },
  button: {
    position: "absolute",
    zIndex: 2,
    bottom: 30,
    height: 60,
    width: "60%",
    borderRadius: 30,
    elevation: 6,
  },
});
