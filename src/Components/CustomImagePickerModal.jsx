import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import tw from 'twrnc';

const CustomImagePickerModal = ({ isVisible, onClose, handleImageSelection }) => {


    return (
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Select one from your album.</Text>

                <TouchableOpacity style={styles.button} onPress={handleImageSelection}>
                    <Text style={styles.buttonText}>Select from Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'indigo',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
});

export default CustomImagePickerModal;
