import { DialogProps } from "@material-ui/core/Dialog";

export interface SettingsDialogProps extends DialogProps {
	onClose: () => void;
}
