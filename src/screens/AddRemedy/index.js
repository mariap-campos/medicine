import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { v4 as uuidv4 } from 'uuid';
import Pills from '../../assets/icons/medicine.png';
import Watch from '../../assets/icons/watch.png';
import { Header } from '../../components/Header';
import 'react-native-get-random-values';
import { COLORS } from '../../theme';
import { globalStyles } from '../../theme/globalStyles';
import { styles } from './styles';

export function AddRemedy() {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    try {
      const list = await AsyncStorage.getItem('PILLS');
      if (list) {
        return JSON.parse(list);
      } else {
        return [];
      }
    } catch (err) {
      console.debug(err);
    }
  };

  const saveRemedy = async (name) => {
    setLoading(true);
    const newRemedy = {
      name,
      id: uuidv4(),
    };
    try {
      console.debug('AQUI');
      const existingList = await getList();
      console.debug(existingList);

      const updatedList = [...existingList, newRemedy]; // notice the newData here
      console.debug(updatedList);
      await AsyncStorage.setItem('PILLS', JSON.stringify(updatedList));
      setLoading(false);
      navigation.navigate('Home');
    } catch (err) {}
  };

  return (
    <>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <Text style={[globalStyles.title, styles.title]}>Adicionar Remédio</Text>
          <TextInput
            label="Nome do Remédio"
            value={name}
            activeUnderlineColor={COLORS.LIGHT_BLUE}
            onChangeText={(name) => setName(name)}
          />
          <Button
            icon="content-save"
            color={COLORS.LIGHT_BLUE}
            style={{ marginTop: 30 }}
            mode="contained"
            loading={loading}
            onPress={() => saveRemedy(name)}>
            Adicionar
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
