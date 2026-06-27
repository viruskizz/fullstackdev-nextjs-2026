import supabase from "./supabase"

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
  return {data, error};
}

export async function getUser() {
  const {data, error } = await supabase.auth.getUser();
  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}