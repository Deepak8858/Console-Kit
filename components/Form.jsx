import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function Form() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState([]);
  const handleSelectImage = () => {
  if (images.length >= 5) return;

  launchImageLibrary({ selectionLimit: 5 - images.length, mediaType: 'photo' }, (response) => {
    if (response.assets) {
      setImages((prev) => [...prev, ...response.assets]);
    }
  });
};



  const categories = ['Controller', 'Headset', 'Console', 'Accessories'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Sell Gaming Gear</Text>

      <Text style={styles.label}>Add Photos</Text>
<View style={styles.imageContainer}>
  <TouchableOpacity style={styles.addPhotoBox} onPress={handleSelectImage}>
    <Text style={{ color: '#aaa', textAlign: 'center' }}>+</Text>
    <Text style={{ color: '#aaa', fontSize: 10, textAlign: 'center' }}>Add Photos</Text>
  </TouchableOpacity>

  {images.map((img, index) => (
    <Image
      key={index}
      source={{ uri: img.uri }}
      style={styles.thumbnail}
    />
  ))}
</View>
<Text style={styles.uploadInfo}>Upload up to 5 images (tap + to add)</Text>


      {/* Product Title */}
      <Text style={styles.label}>Product Title</Text>
      <TextInput style={styles.input} placeholder="Enter product title" placeholderTextColor="#aaa" />

      {/* Condition Dropdown */}
      <Text style={styles.label}>Condition</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={condition}
          onValueChange={(itemValue) => setCondition(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Select condition" value="" color="#aaa" />
          <Picker.Item label="New" value="New" />
          <Picker.Item label="Like New" value="Like New" />
          <Picker.Item label="Used" value="Used" />
        </Picker>
      </View>

      {/* Price */}
      <Text style={styles.label}>Price (INR)</Text>
      <TextInput style={styles.input} placeholder="₹ 0.00" keyboardType="numeric" placeholderTextColor="#aaa" />

      {/* Category (Moved Up) */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.chipContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              selectedCategory === category && styles.selectedChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === category && styles.selectedChipText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Describe your product..."
        placeholderTextColor="#aaa"
        multiline
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.previewButton}>
        <Text style={styles.buttonText}>Preview Listing</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit for Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
 container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#ccc',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  pickerWrapper: {
    backgroundColor: '#222',
    borderRadius: 8,
  },
  picker: {
    color: '#fff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chip: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedChip: {
    backgroundColor: '#1e64e1',
  },
  chipText: {
    color: '#fff',
  },
  selectedChipText: {
    fontWeight: 'bold',
  },
  previewButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#1e64e1',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  marginBottom: 10,
},
addPhotoBox: {
  width: 70,
  height: 70,
  backgroundColor: '#222',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
},
thumbnail: {
  width: 70,
  height: 70,
  borderRadius: 8,
  marginRight: 8,
},
uploadInfo: {
  color: '#888',
  fontSize: 12,
  marginBottom: 10,
}

});
