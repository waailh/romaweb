import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { ifEqual, ifHasEmpty, validatePassword } from "@/lib/utils";
import { ArrowPathIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { ChangeEvent, MouseEvent, useState } from "react";
import toast from "react-hot-toast";

type Form = {
  old_pass: string;
  pass: string;
  confirm_pass: string;
};

const initialForm = {
  old_pass: "",
  pass: "",
  confirm_pass: "",
};

const ChangePassword = () => {
  const [form, setForm] = useState<Form>(initialForm);

  const [oldPassType, setOldPassType] = useState(true);
  const [passType, setPassType] = useState(true);
  const [passConfType, setPassConfType] = useState(true);

  const [loading, setLoading] = useState(false);

  const t = useTranslations("Account");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const updatePass = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (ifHasEmpty(form)) return toast.error(tet("emptyflds"));

    const passValidate = validatePassword(form.pass);
    switch (passValidate) {
      case "short":
        return toast.error(tet("passshort"));
        break;
      case "number":
        return toast.error(tet("passnum"));
        break;
      case "letter":
        return toast.error(tet("passletter"));
        break;
      case "strange":
        return toast.error(tet("passstrange"));
        break;

      default:
        break;
    }

    if (!ifEqual(form.pass, form.confirm_pass))
      return toast.error(tet("passmatch"));

    // actually sign up
    const axios = axiosWithAuth();
    setLoading(true);

    axios
      .post(`/auth/password/change`, {
        old_password: form.old_pass,
        new_password: form.pass,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          toast.success(tst("passup"));
        } else {
          toast.error(res.data.message[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        const { message } = err.response.data;
        if (message) return toast.error(message[0]);
        toast.error(tet("err"));
      });
  };

  return (
    <div className="w-full mt-2 md:mt-4 rounded p-1 md:p-2 border flex flex-col space-y-2">
      <h5 className="mb-2">{t("chngpass")}</h5>
      <div className="w-full flex flex-col space-y-1">
        <label htmlFor="">{t("oldpass")}</label>
        <div className="flex items-center justify-between px-2 py-1 rounded text-sm border">
          <input
            name="old_pass"
            value={form.old_pass}
            onChange={(e) => changeForm(e)}
            type={oldPassType ? "password" : "text"}
            className="w-full bg-transparent outline-none"
            placeholder="**********"
            required
          />
          <EyeSlashIcon
            onClick={() => setOldPassType(!passType)}
            className="size-4"
          />
        </div>
      </div>
      <div className="w-full flex flex-col space-y-1">
        <label htmlFor="">{t("nupass")}</label>
        <div className="flex items-center justify-between px-2 py-1 rounded text-sm border">
          <input
            name="pass"
            value={form.pass}
            onChange={(e) => changeForm(e)}
            type={passType ? "password" : "text"}
            className="w-full bg-transparent outline-none"
            placeholder="**********"
            required
          />
          <EyeSlashIcon
            onClick={() => setPassType(!passType)}
            className="size-4"
          />
        </div>
      </div>
      <div className="w-full flex flex-col space-y-1">
        <label htmlFor="">{t("confpass")}</label>
        <div className="flex items-center justify-between px-2 py-1 rounded text-sm border">
          <input
            name="confirm_pass"
            value={form.confirm_pass}
            onChange={(e) => changeForm(e)}
            type={passConfType ? "password" : "text"}
            className="w-full bg-transparent outline-none"
            placeholder="**********"
            required
          />
          <EyeSlashIcon
            onClick={() => setPassConfType(!passConfType)}
            className="size-4"
          />
        </div>
      </div>

      <button
        disabled={loading}
        onClick={(e) => updatePass(e)}
        className="bg-primary px-2 py-1 rounded text-white hover:bg-black duration-300 flex items-center justify-center text-center"
      >
        {loading ? (
          <span>
            <ArrowPathIcon className="animate-spin size-4" />
          </span>
        ) : (
          <span>{t("chngpass")}</span>
        )}
      </button>
    </div>
  );
};

export default ChangePassword;
