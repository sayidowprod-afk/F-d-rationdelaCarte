export type Member = {
  id: string;
  membership_number: number;
  pseudo: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  city: string | null;
  birth_date: string | null;
  bio: string | null;
  avatar_url: string | null;
  memorabilius_pseudo: string | null;
  memorabilius_url: string | null;
  membership_expires_at: string | null;
  show_on_map: boolean;
  latitude: number | null;
  longitude: number | null;
  is_admin: boolean;
  joined_at: string;
  created_at: string;
};

export function memberDisplayName(m: Pick<Member, "pseudo" | "first_name" | "last_name">) {
  const fullName = [m.first_name, m.last_name].filter(Boolean).join(" ");
  return fullName ? `${m.pseudo} (${fullName})` : m.pseudo;
}

export function isMembershipActive(m: Pick<Member, "membership_expires_at">) {
  return !!m.membership_expires_at && m.membership_expires_at >= todayIso();
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  event_date: string | null;
  author_id: string | null;
  created_at: string;
};
