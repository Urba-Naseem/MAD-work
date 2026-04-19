import React from "react";
import {View, TextInput, Button, Text} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";

export default function App(){
    const formSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),

        email:  Yup.string().email("Invalid Email").required("Email is required"),

        age: Yup.number().required("Age is required"),

        country: Yup.string().required("Country is required")
    });

    return(
        <View style={{ padding: 20, marginTop: 50 }}>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    age: "",
                    country: ""
                }}

                validationSchema={formSchema}
                onSubmit={(values, {resetForm}) =>{
                    console.log(values);
                    resetForm();
                }}
            >
                {({ handleChange, handleSubmit, handleBlur, values, errors, touched}) =>(
                    <View>
                        <Text>Name: </Text>
                        <TextInput
                           placeholder="Enter name"
                           onChangeText={handleChange("name")}
                           onBlur={handleBlur("name")}
                           value={values.name}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {touched.name && errors.name && <Text>{errors.name}</Text>}

                        <Text>Email: </Text>
                        <TextInput
                           placeholder="Enter email"
                           onChangeText={handleChange("email")}
                           onBlur={handleBlur("email")}
                           value={values.email}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {touched.email && errors.email && <Text>{errors.email}</Text>}

                        <Text>Age: </Text>
                        <TextInput
                           placeholder="Enter age"
                           keyboardType="numeric"
                           onChangeText={handleChange("age")}
                           onBlur={handleBlur("age")}
                           value={values.age}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {touched.age && errors.age && <Text>{errors.age}</Text>}

                        <Text>Country: </Text>
                        <TextInput
                           placeholder="Enter country"
                           onChangeText={handleChange("country")}
                           onBlur={handleBlur("country")}
                           value={values.country}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {touched.country && errors.country && <Text>{errors.country}</Text>}

                        <Button title="Submit" onPress={handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    );
}
