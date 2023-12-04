import React, { useEffect, useTransition } from 'react';
import { Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRootStore } from '../hooks/UseRootStore';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';


export default function NewsScreen({ }) {
    const { t } = useTranslation()

    return (
        <View>
            <Text>{t('main.screens.home.title')}</Text>
        </View>
    )
}