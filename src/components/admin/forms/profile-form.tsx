import { saveProfileAction } from "@/app/admin/actions/profile-actions";
import { uploadProfileAvatarAction } from "@/app/admin/actions/media-actions";
import { ImagePreviewCard } from "@/components/admin/media/image-preview-card";
import { ImageUploadField } from "@/components/admin/media/image-upload-field";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { Profile } from "@/types/admin";

type ProfileFormProps = {
  profile: Profile | null;
};

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor={name}>
        {label}
      </label>
      <input
        className="brutal-border w-full bg-card px-4 py-3 font-bold outline-none focus-visible:ring-4 focus-visible:ring-dev"
        defaultValue={defaultValue}
        id={name}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
}

export function ProfileForm({ profile }: ProfileFormProps) {
  return (
    <BrutalCard className="space-y-6">
      <div>
        <h2 className="text-3xl font-black">Perfil publico</h2>
        <p className="mt-2 leading-7">
          Edite os dados base do perfil. O avatar pode ser uma URL manual ou uma
          imagem enviada ao Supabase Storage.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <ImagePreviewCard
          alt="Avatar atual do perfil"
          imageUrl={profile?.avatarUrl}
          title="Avatar atual"
        />

        <div className="brutal-border space-y-4 bg-card p-4">
          <h3 className="text-2xl font-black">Enviar novo avatar</h3>
          <p className="leading-7">
            O upload salva a imagem no Supabase Storage e preenche a URL publica
            no perfil.
          </p>
          <form action={uploadProfileAvatarAction} className="space-y-4">
            <ImageUploadField label="Imagem do avatar" />
            <BrutalButton type="submit" variant="dev">
              Enviar avatar
            </BrutalButton>
          </form>
        </div>
      </div>

      <form action={saveProfileAction} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Nome completo"
            name="fullName"
            defaultValue={profile?.fullName}
            required
          />
          <Field
            label="Nome de exibicao"
            name="displayName"
            defaultValue={profile?.displayName}
          />
        </div>

        <Field label="Headline" name="headline" defaultValue={profile?.headline} />

        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="brutal-border min-h-36 w-full bg-card px-4 py-3 font-bold leading-7 outline-none focus-visible:ring-4 focus-visible:ring-dev"
            defaultValue={profile?.bio}
            id="bio"
            name="bio"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Avatar URL" name="avatarUrl" defaultValue={profile?.avatarUrl} />
          <Field
            label="E-mail publico"
            name="emailPublic"
            type="email"
            defaultValue={profile?.emailPublic}
          />
          <Field
            label="Telefone publico"
            name="phonePublic"
            defaultValue={profile?.phonePublic}
          />
          <Field
            label="WhatsApp URL"
            name="whatsappUrl"
            defaultValue={profile?.whatsappUrl}
          />
          <Field label="GitHub URL" name="githubUrl" defaultValue={profile?.githubUrl} />
          <Field label="Behance URL" name="behanceUrl" defaultValue={profile?.behanceUrl} />
          <Field
            label="LinkedIn URL"
            name="linkedinUrl"
            defaultValue={profile?.linkedinUrl}
          />
          <Field
            label="Instagram URL"
            name="instagramUrl"
            defaultValue={profile?.instagramUrl}
          />
        </div>

        <BrutalButton type="submit" variant="dev">
          Salvar perfil
        </BrutalButton>
      </form>
    </BrutalCard>
  );
}
