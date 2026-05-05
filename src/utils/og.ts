type OgImageOptions = {
  title: string;
  description?: string;
  label?: string;
};

export function ogImage({ title, description, label }: OgImageOptions) {
  const params = new URLSearchParams({ title });

  if (description) {
    params.set("description", description);
  }

  if (label) {
    params.set("label", label);
  }

  return `/api/og/generate?${params.toString()}`;
}
