import { useState } from 'react';
import { UserSelection } from './components/UserSelection';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { CitizenDashboard } from './components/CitizenDashboard';
import { AdminDashboard } from './components/AdminDashboard';

/**
 * Τύποι χρηστών που υποστηρίζει το σύστημα
 * - employee: Υπάλληλος Δήμου
 * - citizen: Πολίτης (δημόσια προβολή)
 * - admin: Διαχειριστής Συστήματος
 */
export type UserType = 'employee' | 'citizen' | 'admin' | null;

/**
 * Κύριο Component της εφαρμογής efficiencity
 * Διαχειρίζεται την επιλογή τύπου χρήστη και την εμφάνιση του αντίστοιχου dashboard
 */
export default function App() {
  // State για τον τύπο χρήστη που έχει επιλεγεί
  const [userType, setUserType] = useState<UserType>(null);
  // State για την κατάσταση σύνδεσης
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Χειρισμός αποσύνδεσης χρήστη
   * Επαναφέρει το userType και isLoggedIn στις αρχικές τιμές
   */
  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
  };

  // Αν δεν έχει επιλεγεί χρήστης ή δεν έχει συνδεθεί, εμφάνιση οθόνης επιλογής
  if (!userType || !isLoggedIn) {
    return <UserSelection onSelectUser={setUserType} onLogin={setIsLoggedIn} />;
  }

  // Εμφάνιση του κατάλληλου dashboard ανάλογα με τον τύπο χρήστη
  return (
    <>
      {/* Dashboard Υπαλλήλου Δήμου */}
      {userType === 'employee' && <EmployeeDashboard onLogout={handleLogout} />}
      {/* Dashboard Πολίτη */}
      {userType === 'citizen' && <CitizenDashboard onLogout={handleLogout} />}
      {/* Dashboard Διαχειριστή */}
      {userType === 'admin' && <AdminDashboard onLogout={handleLogout} />}
    </>
  );
}