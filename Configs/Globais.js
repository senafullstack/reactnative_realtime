import { Dimensions } from "react-native";

class Globais {
 
  static percentualaltura = (percentual) => {
    const dimensions = Dimensions.get("window");
    var altura = dimensions.height;
    altura = (altura * percentual) / 100;
    return altura;
  };
 static percentuallargura = (percentual) => {
    const dimensions = Dimensions.get("window");
    var largura = dimensions.width;
    largura = (largura * percentual) / 100;
    return largura;
  };



}

export default Globais;
