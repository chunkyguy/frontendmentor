import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const R = {
  colors: {
    white: "hsl(0, 0%, 100%)",
    lightPink: "hsl(275, 100%, 97%)",
    grayishPurple: "hsl(292, 16%, 49%)",
    darkPurple: "hsl(292, 42%, 14%)",
  },
  images: {
    background: require("./assets/images/background-pattern.png"),
    iconStar: require("./assets/images/icon-star.png"),
    iconPlus: require("./assets/images/icon-plus.png"),
    iconMinus: require("./assets/images/icon-minus.png"),
  },
  fonts: {
    regular: {
      name: "WorkSans-Regular",
      weight: 400,
    },
    semibold: {
      name: "WorkSans-SemiBold",
      weight: 600,
    },
    bold: {
      name: "WorkSans-Bold",
      weight: 700,
    },
  },
  strings: {
    header: "FAQs",
    content: [
      {
        title: "What is Frontend Mentor, and how will it help me?",
        body: "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.",
      },
      {
        title: "Is Frontend Mentor free?",
        body: "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.",
      },
      {
        title: "Can I use Frontend Mentor projects in my portfolio?",
        body: "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!",
      },
      {
        title: "How can I get help if I'm stuck on a challenge?",
        body: "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.",
      },
    ],
  },
};

function Cell({ text, isOpen }) {
  const [maxHeight, setMaxHeight] = useState(0);
  const cellBodyContainerStyle = useAnimatedStyle(() => {
    const height = isOpen ? withTiming(maxHeight) : withTiming(0);
    return { height };
  });
  return (
    <Animated.View style={[cellBodyContainerStyle, { overflow: "hidden" }]}>
      <View
        style={{ position: "absolute" }}
        onLayout={(e) => {
          if (maxHeight === 0) {
            setMaxHeight(e.nativeEvent.layout.height);
          }
        }}
      >
        <Text style={styles.cellBody}>{text}</Text>
      </View>
    </Animated.View>
  );
}

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={R.images.background} />
      <View style={styles.scrollContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentHeader}>
            <Image source={R.images.iconStar} />
            <Text style={styles.contentHeaderTitle}>{R.strings.header}</Text>
          </View>
          {R.strings.content.map(({ title, body }, index) => {
            return (
              <View
                key={title}
                style={[
                  styles.cell,
                  {
                    borderBottomWidth:
                      index === R.strings.content.length - 1 ? 0 : 1,
                  },
                ]}
              >
                <Pressable
                  style={styles.cellHeader}
                  onPress={() =>
                    setSelectedIndex((prev) => (prev === index ? null : index))
                  }
                >
                  <Text style={styles.cellTitle}>{title}</Text>
                  <Image
                    style={styles.cellIcon}
                    source={
                      selectedIndex === index
                        ? R.images.iconMinus
                        : R.images.iconPlus
                    }
                  />
                </Pressable>
                <Cell text={body} isOpen={index === selectedIndex} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.lightPink,
  },
  backgroundImage: {
    width: "100%",
    resizeMode: "cover",
  },
  scrollContainer: {
    position: "absolute",
    backgroundColor: R.colors.white,
    borderRadius: 16,
    width: Dimensions.get("window").width - 32,
    height: Dimensions.get("window").height - 150,
    top: 150,
    left: 16,
    right: 16,
    padding: 32,
  },
  scrollView: {
    backgroundColor: "transparent",
  },
  contentHeader: {
    flexDirection: "row",
    gap: 32,
    paddingVertical: 8,
  },
  contentHeaderTitle: {
    fontSize: 36,
    fontFamily: R.fonts.bold.name,
    fontWeight: R.fonts.bold.weight,
  },
  cell: {
    paddingVertical: 16,
    borderBottomColor: R.colors.lightPink,
  },
  cellHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cellTitle: {
    fontSize: 20,
    fontFamily: R.fonts.semibold.name,
    fontWeight: R.fonts.semibold.weight,
    width: "90%",
  },
  cellBody: {
    fontSize: 16,
    fontFamily: R.fonts.regular.name,
    lineHeight: 22,
    color: R.colors.grayishPurple,
    paddingTop: 16,
  },
});
