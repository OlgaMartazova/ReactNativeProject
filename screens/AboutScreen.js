import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';


export default function AboutScreen({ }) {
    const { t } = useTranslation()

    return (
        <View>
            <Text>{t('main.screens.about')}</Text>
        </View>
    )
}