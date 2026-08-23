export type MembershipStatus = "pending" | "active" | "expired";

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
  status: MembershipStatus;
  is_admin: boolean;
  joined_at: string;
  created_at: string;
};

export function memberDisplayName(m: Pick<Member, "pseudo" | "first_name" | "last_name">) {
  const fullName = [m.first_name, m.last_name].filter(Boolean).join(" ");
  return fullName ? `${m.pseudo} (${fullName})` : m.pseudo;
}

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  event_date: string | null;
  author_id: string | null;
  created_at: string;
};
