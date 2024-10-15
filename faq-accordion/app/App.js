import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
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

function Cell({ index, title, body }) {
  const [isOpen, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);

  useEffect(() => {
    setOpen(index === 0);
  }, []);

  function handlePress() {
    setOpen((prev) => !prev);
  }

  function handleLayout(event) {
    const height = event.nativeEvent.layout.height;
    if (height > 0 && height !== bodyHeight) {
      setBodyHeight(height);
    }
  }

  const bodyStyle = useAnimatedStyle(() => {
    const currHeight = isOpen ? withTiming(bodyHeight) : withTiming(0);
    return { height: currHeight };
  });

  return (
    <View
      style={[
        styles.cell,
        { borderBottomWidth: index === R.strings.content.length - 1 ? 0 : 1 },
      ]}
    >
      <Pressable style={styles.cellHeader} onPress={handlePress}>
        <Text style={styles.cellTitle}>{title}</Text>
        <Image
          style={styles.cellIcon}
          source={isOpen ? R.images.iconMinus : R.images.iconPlus}
        />
      </Pressable>
      <Animated.View style={[bodyStyle, { overflow: "hidden" }]}>
        <View style={{ position: "absolute" }} onLayout={handleLayout}>
          <Text style={styles.cellBody}>{body}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.backgroundImage}
        source={R.images.background}
      ></Image>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Image source={R.images.iconStar} />
          <Text style={styles.contentHeaderTitle}>{R.strings.header}</Text>
        </View>
        <FlatList
          keyExtractor={(item) => item.title}
          data={R.strings.content}
          renderItem={({ item, index }) => (
            <Cell index={index} title={item.title} body={item.body} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.lightPink,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    backgroundColor: R.colors.white,
    position: "absolute",
    top: 150,
    padding: 32,
    margin: 16,
    borderRadius: 16,
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
  cellIcon: {},
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
