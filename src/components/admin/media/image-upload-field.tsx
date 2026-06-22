import { getAllowedImageTypesLabel, getMaxImageSizeLabel } from "@/config/media";

type ImageUploadFieldProps = {
  label: string;
  name?: string;
  helpText?: string;
};

export function ImageUploadField({
  label,
  name = "image",
  helpText,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor={name}>
        {label}
      </label>
      <input
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="brutal-border w-full bg-card px-4 py-3 font-bold outline-none file:mr-4 file:border-2 file:border-foreground file:bg-muted file:px-3 file:py-2 file:font-black focus-visible:ring-4 focus-visible:ring-dev"
        id={name}
        name={name}
        type="file"
      />
      <p className="text-sm font-bold leading-6 text-muted-foreground">
        {helpText ?? `Aceita ${getAllowedImageTypesLabel()}, ate ${getMaxImageSizeLabel()}.`}
      </p>
    </div>
  );
}
