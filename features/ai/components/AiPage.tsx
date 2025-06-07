import {
  ImagePickerAsset,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  useMediaLibraryPermissions
} from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  TextInput,
  View
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AiMessageResponse } from "../types";
import { useAi } from "../use-ai";
import { AiImages } from "./AiImages";
import { AiMessages } from "./AiMessages";

export function AiPage() {
  const [messages, setMessages] = useState<AiMessageResponse[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([]);
  const [userMessage, setUserMessage] = useState<string>();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const insets = useSafeAreaInsets();
  const [, requestCameraPermission] = useCameraPermissions();
  const [, requestMediaLibraryPermissions] = useMediaLibraryPermissions();

  const { createMessage, getMessages } = useAi();

  const onChangeText = (text: string) => {
    setUserMessage(text);
    if (text.endsWith("\n")) {
      const trimmedText = text.trim();
      if (trimmedText) {
        handleCreateMessage(trimmedText);
      }
      setUserMessage("");
    }
  };

  const handleCreateMessage = async (message: string) => {
    const response = await createMessage(message);
    if (response) {
      setMessages(response);
    }
  };

  const handleOnPress = async () => {
    try {
      Alert.alert("Add Image", "Choose an option", [
        {
          text: "Camera",
          onPress: handleCameraPress,
        },
        {
          text: "Gallery",
          onPress: handleMediaLibraryPress,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error opening camera/gallery:", error);
    }
  };

  const handleCameraPress = async () => {
    if (Platform.OS === "web") return;

    const { granted: cameraPermissionGranted} = await requestCameraPermission();

    if (!cameraPermissionGranted) {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take a photo."
      );
      return;
    }

      const result = await launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if(result.canceled) {
        return;
      }

      const assets = result.assets ?? [];
      setSelectedImages((prevImages) => [...prevImages, ...assets]);
  };

  const handleMediaLibraryPress = async () => {
    if (Platform.OS === "web") return;
    const { granted: mediaLibraryPermissionGranted } =
      await requestMediaLibraryPermissions();
    if (!mediaLibraryPermissionGranted) {
      Alert.alert(
        "Permission Denied",
        "Media library access is required to select a photo."
      );
      return;
    }
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const assets = result.assets ?? [];
    setSelectedImages((prevImages) => [...prevImages, ...assets]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        setMessages(response);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [getMessages]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, padding: 16, paddingBottom: insets.bottom }}
      >
        <ScrollView style={{ flex: 1, marginBottom: 8 }} ref={scrollViewRef}>
          <AiMessages messages={messages} />
        </ScrollView>
        <AiImages images={selectedImages} setImages={setSelectedImages}/>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            value={userMessage}
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              fontSize: 16,
              maxHeight: 120,
              marginBottom: 16,
              width: "70%",
              flexGrow: 1,
            }}
            placeholder="Type a message..."
          />
          <Button title="Add File" onPress={handleOnPress} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
