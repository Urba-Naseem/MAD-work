import React from "react";
import {View, TextInput, Button, Text} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import styles from "./frontend/style/Formik4Style";

export default function App(){
    const formSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email:  Yup.string().email("Invalid Email").required("Email is required"),
        age: Yup.number().required("Age is required"),
        country: Yup.string().required("Country is required")
    });

    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Registration Form</Text>
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
                           style={styles.input}
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <Text>Email: </Text>
                        <TextInput
                           placeholder="Enter email"
                           onChangeText={handleChange("email")}
                           onBlur={handleBlur("email")}
                           value={values.email}
                           style={styles.input}
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <Text>Age: </Text>
                        <TextInput
                           placeholder="Enter age"
                           keyboardType="numeric"
                           onChangeText={handleChange("age")}
                           onBlur={handleBlur("age")}
                           value={values.age}
                           style={styles.input}
                        />
                        {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}

                        <Text>Country: </Text>
                        <TextInput
                           placeholder="Enter country"
                           onChangeText={handleChange("country")}
                           onBlur={handleBlur("country")}
                           value={values.country}
                           style={styles.input}
                        />
                        {touched.country && errors.country && <Text style={styles.error}>{errors.country}</Text>}

                        <View style={styles.btn}>
                         <Button title="Submit" onPress={handleSubmit}/>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
}
