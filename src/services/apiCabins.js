import supabase, { supabaseUrl } from './supabase.js';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log('error', error);
    throw new Error('Cabins could not be fetched');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log('error', error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  let imagePath = newCabin.image;

  if (!hasImagePath) {
    const imageName = `${Math.random()}-${newCabin.image.name.replaceAll(
      '/',
      ''
    )}`;

    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.log(storageError);
      throw new Error('Cabin image could not be uploaded');
    }

    const { data: publicUrl, error: urlError } = await supabase.storage
      .from('cabin-images')
      .getPublicUrl(imageName);

    if (urlError) {
      console.log(urlError);
      throw new Error('Could not retrieve image URL');
    }

    imagePath = publicUrl.publicUrl;
  }
  let query = supabase.from('cabins');

  if (!id) query = query.insert({ ...newCabin, image: imagePath });

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  console.log(data);

  return data;
}
