import { Button } from 'react-bootstrap';
import ROUTES from '~/consts/ROUTES';
import './navigationOverride.css';
import './navigation.css';

interface NavigationConfirmModalProps {
    onCancelNavigation: () => void;
}

export default function NavigationConfirmModal({
    onCancelNavigation,
}: NavigationConfirmModalProps) {

    return (
        <div className="back-confirm-modal">
            <div className="back-confirm-content">
                <p>Are you sure?</p>
                <Button onClick={() => window.location.href = ROUTES.pokePeru.battle}>Yes</Button>
                <Button onClick={() => onCancelNavigation()}>No</Button>
            </div>
        </div>
    );
}