// Type pour la réponse
export type CompteResponse = {
    status: boolean;
    status_code: number;
    message: string;
    data: {
      comptes: Compte[];
    };
  }
  
  // Type pour les comptes
  export type Compte  = {
    id: number;
    ref: string;
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    whatsapp: string | null;
    code_postal: string;
    pays: string | null;
    ville: string | null;
    adresse: string;
    email_verified_at: string;
    created_at: string;
    abonnement: Abonnement | null;
    abonnement_status: boolean;
  }

  // Type pour l'abonnement
export type Abonnement = {
    date_debut: string;
    date_fin: string;
    formule: string;
    durée: number;
    montant: number;
    avantages: Avantage[];
  };

  export type Avantage = {
    avantage: string;
  };