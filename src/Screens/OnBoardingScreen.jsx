import React, { useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";


const COLORS = {
    primary: '#f52d56',
    title: '#072F4A',
    white: '#FFFFFF',
    lightGrey: '#D3D6D6',
    grey: '#C1C0C9',
    blue: '#087BB6',
    yellow: '#F4D03F',
};

export const SIZES = {
    h1: 22,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,
}
const slides = [
    {
        id: 1,
        title: 'Manage Classes Easily',
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: 'https://unblast.com/wp-content/uploads/2020/05/Back-to-School-Illustration.jpg'
    },
    {
        id: 2,
        title: 'Ali is Gay',
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: 'https://unblast.com/wp-content/uploads/2020/05/Back-to-School-Illustration.jpg'
    },
    {
        id: 3,
        title: 'Pick Up The Delivery',
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: 'https://unblast.com/wp-content/uploads/2020/05/Back-to-School-Illustration.jpg'
    }
]

export default function OnBoardingScreen({ setShowHomePage}) {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(COLORS.primary);

    const buttonLabel = (label) => {
        return (
            <View style={{
                padding: 12
            }}>
                <Text style={{
                    color: COLORS.white,
                    fontWeight: '600',
                    fontSize: SIZES.h4,
                }}>
                    {label}
                </Text>
            </View>
        )
    }

    
        return (
            <AppIntroSlider
                data={slides}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 15,
                            paddingTop: 100,
                        }}>
                            <Image
                            source={{ uri: item.image }}
                            style={{
                                width: 300,
                                height: 400,
                            }}
                            resizeMode="contain"
                        />
                            <Text style={{
                                fontWeight: 'bold',
                                color: COLORS.white,
                                fontSize: SIZES.h1,
                            }}>
                                {item.title}
                            </Text>
                            <Text style={{
                                textAlign: 'center',
                                paddingTop: 5,
                                color: COLORS.white
                            }}>
                                {item.description}
                            </Text>
                        </View>
                    )
                }}
                activeDotStyle={{
                    backgroundColor: COLORS.white,
                    width: 30,
                }}
                showSkipButton
                renderNextButton={() => buttonLabel("Next")}
                renderSkipButton={() => buttonLabel("Skip")}
                renderDoneButton={() => buttonLabel("Done")}
                onDone={() => {
                    setShowHomePage(true);
                }}
            />
        )
   
}