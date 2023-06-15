import React from 'react';
import IonIcon  from 'react-native-vector-icons/Ionicons'
import { View , TouchableOpacity  } from 'react-native';
import {Platform} from 'react-native';

export function Icon(props) {
  const {name, ...rest } = props;

  return (
    <TouchableOpacity>
         <IonIcon  name = {name}
      
    />
    </TouchableOpacity>
  );
}
