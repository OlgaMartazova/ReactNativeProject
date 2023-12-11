import { StyleSheet } from "react-native";

export const useStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundPrimary
    }
    ,
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
    ,
    titleText: {
        color: colors.textPrimary,
        fontSize:
            20,
    }
});