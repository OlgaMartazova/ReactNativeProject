import { SafeAreaView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../modules/theme/hooks/UseTheme';
import { useStyles } from '../modules/theme/hooks/UseStyles';


export default function NewsScreen({ }) {
    const { t } = useTranslation()

    const { Colors } = useTheme();
    const styles = useStyles(Colors);

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.content]}>
                <Text style={[styles.titleText]}>{t('main.screens.news')}</Text>
            </View>
        </SafeAreaView>
    )
}