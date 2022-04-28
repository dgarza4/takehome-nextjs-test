interface NomineeType {
  id: string;
  photoUrL: string;
  title: string;
}

interface CategoryType {
  id: string;
  items: NomineeType[];
  title: string;
}
