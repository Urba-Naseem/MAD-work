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
                {(props) =>(
                    <View>
                        <Text>Name: </Text>
                        <TextInput
                           placeholder="Enter name"
                           onChangeText={props.handleChange("name")}
                           onBlur={props.handleBlur("name")}
                           value={props.values.name}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {props.touched.name && props.errors.name && <Text>{props.errors.name}</Text>}

                        <Text>Email: </Text>
                        <TextInput
                           placeholder="Enter email"
                           onChangeText={props.handleChange("email")}
                           onBlur={props.handleBlur("email")}
                           value={props.values.email}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {props.touched.email && props.errors.email && <Text>{props.errors.email}</Text>}

                        <Text>Age: </Text>
                        <TextInput
                           placeholder="Enter age"
                           keyboardType="numeric"
                           onChangeText={props.handleChange("age")}
                           onBlur={props.handleBlur("age")}
                           value={props.values.age}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {props.touched.age && props.errors.age && <Text>{props.errors.age}</Text>}

                        <Text>Country: </Text>
                        <TextInput
                           placeholder="Enter country"
                           onChangeText={props.handleChange("country")}
                           onBlur={props.handleBlur("country")}
                           value={props.values.country}
                           style={{ borderWidth: 1, marginBottom: 10 }}
                        />
                        {props.touched.country && props.errors.country && <Text>{props.errors.country}</Text>}

                        <Button title="Submit" onPress={props.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    );
}
