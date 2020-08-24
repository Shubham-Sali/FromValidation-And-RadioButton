import React, { Component } from 'react';
import { TextInput, Text, Button, Alert, View, StyleSheet } from 'react-native';
import RadioButton from './component/RadioButton';
import * as yup from 'yup'
import { Formik } from 'formik'

const PROP = [
	{
		key: 'Samsung',
		text: 'Samsung',
	},
	{
		key: 'Apple',
		text: 'Apple',
	},
	{
		key: 'Motorola',
		text: 'Motorola',
	},
	{
		key: 'Lenovo',
		text: 'Lenovo',
  },
];


export default class App extends Component {
  render() {
    const inputStyle = {
      borderWidth: 1,
      borderColor: '#4e4e4e',
      padding: 12,
      marginBottom: 5,
    };

    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          name: yup.string().required("Please, provide your name!"),
          email: yup.string().email().required(),
          password: yup
            .string()
            .min(4)
            .max(10, "Password should not excced 10 chars.")
            .required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              value={values.name}
              style={inputStyle}
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              placeholder="Name"
            />
            {touched.name && errors.name && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.name}
              </Text>
            )}
            <TextInput
              value={values.email}
              style={inputStyle}
              keyboardType='email-address'
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.email}
              </Text>
            )}
            <TextInput
              value={values.password}
              style={inputStyle}
              onChangeText={handleChange("password")}
              placeholder="Password"
              onBlur={() => setFieldTouched("password")}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.password}
              </Text>
            )}
            <Button
              color="#3740FE"
              title="Submit"
              disabled={!isValid}
              onPress={handleSubmit}
            />
            <View style={styles.container}>
              <RadioButton PROP={PROP} />
            </View>
          </View>
        )}
      </Formik>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
    formContainer: {
    padding: 50 
  }
});


console.disableYellowBox = true;