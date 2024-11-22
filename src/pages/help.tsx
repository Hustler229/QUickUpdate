/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const HelpPage = () => {
  return (
    <div className="help-page">
      <h1 className='text-lg font-bold'>Page d'Aide - <span className="bold-text">QuickUpdate</span></h1>

      <section>
        <details>
          <summary><strong>1. Exporter vos contacts de la carte SIM vers Gmail</strong></summary>
          
          <p><strong>Exporter sur Android</strong></p>
          <ul>
            <li>Ouvrez l'application <strong>Contacts</strong> sur votre téléphone Android.</li>
            <li>Appuyez sur les trois points verticaux dans le coin supérieur droit et sélectionnez <strong>Importer/Exporter</strong>.</li>
            <li>Choisissez <strong>Exporter vers le compte Gmail</strong>.</li>
            <li>Sélectionnez les contacts à exporter ou choisissez tous vos contacts.</li>
            <li>Une fois l'exportation terminée, vous trouverez vos contacts dans votre compte Gmail.</li>
          </ul>

          <p><strong>Exporter sur iOS</strong></p>
          <ul>
            <li>Ouvrez l'application <strong>Contacts</strong> sur votre iPhone.</li>
            <li>Sélectionnez le contact ou les contacts à exporter.</li>
            <li>Appuyez sur <strong>Partager</strong> et choisissez <strong>Gmail</strong> comme destination.</li>
            <li>Si ce n'est pas déjà fait, connectez-vous à votre compte Google.</li>
            <li>Une fois l'exportation réussie, vos contacts seront stockés dans Gmail.</li>
          </ul>
        </details>

        <details>
          <summary><strong>2. Mettre à jour vos contacts avec <span className="bold-text">QuickUpdate</span></strong></summary>
          
          <ul>
            <li>Connectez-vous à votre compte en allant sur la page <strong>Connexion</strong>, entrez votre email et votre mot de passe, puis cliquez sur <strong>Se connecter</strong>.</li>
            <li>Une fois connecté, allez dans le <strong>Auth</strong> de l'application.</li>
            <li>Cliquez sur le bouton <strong>Importer les contacts</strong> pour commencer.</li>
            <li>Vous serez invité à autoriser <span className="bold-text">QuickUpdate</span> à accéder à vos contacts Google. Cette étape est essentielle pour récupérer vos contacts.</li>
            <li>Après avoir autorisé l'accès, <span className="bold-text">QuickUpdate</span> récupérera automatiquement vos contacts depuis Gmail et commencera à les mettre à jour.</li>
            <li>Une fois le processus terminé, vous pourrez voir les fichiers mis à jour dans la section <strong>Paramètres</strong>. Vous pouvez télécharger ou supprimer les fichiers selon vos besoins.</li>
          </ul>
        </details>

        <details>
          <summary><strong>3. Gérer vos fichiers dans Paramètres</strong></summary>

          <ul>
            <li>Dans la page <strong>Paramètres</strong>, vous avez plusieurs options pour gérer vos fichiers mis à jour.</li>
            <li><strong>Télécharger les fichiers VCF</strong> : Vous pouvez télécharger les fichiers contenant vos contacts mis à jour pour les sauvegarder sur votre appareil.</li>
            <li><strong>Supprimer des fichiers</strong> : Si vous n'avez plus besoin de certains fichiers, vous pouvez les supprimer facilement.</li>
            <li><strong>Mise à jour du mot de passe et de l'email</strong> : Modifiez vos informations personnelles pour maintenir la sécurité de votre compte.</li>
          </ul>
        </details>

        <details>
          <summary><strong>4. Statistiques de mise à jour dans le Dashboard</strong></summary>
          
          <ul>
            <li>Le <strong>Dashboard</strong> vous permet de suivre l'état de vos contacts :</li>
            <li><strong>Total des contacts importés</strong> : Le nombre de contacts récupérés depuis votre compte Gmail.</li>
            <li><strong>Contacts sélectionnés pour mise à jour</strong> : Le nombre de contacts qui seront mis à jour.</li>
            <li><strong>Contacts mis à jour</strong> : Le nombre de contacts effectivement mis à jour avec les numéros béninois.</li>
          </ul>
        </details>

        <details>
          <summary><strong>5. Notes de mise en garde et informations importantes</strong></summary>
          
          <ul>
            <li><strong>Conflits de données</strong> : Si certains contacts sont mal formatés, il est possible qu'ils ne soient pas correctement mis à jour. Veillez à ce que vos contacts soient bien organisés avant de lancer l'importation.</li>
            <li><strong>Sécurité des données</strong> : <span className="bold-text">QuickUpdate</span> prend la sécurité de vos données très au sérieux. Vos contacts sont utilisés uniquement pour la mise à jour des numéros et ne sont jamais partagés avec des tiers.</li>
            <li><strong>Connexion nécessaire</strong> : Une connexion Internet est requise pour importer vos contacts depuis Gmail et effectuer les mises à jour. Assurez-vous d'être connecté à Internet pour éviter toute interruption du processus.</li>
            <li><strong>Limitations</strong> : <span className="bold-text">QuickUpdate</span> fonctionne uniquement avec les contacts stockés dans Gmail. Si vous avez des contacts stockés uniquement sur votre téléphone, vous devez d'abord les exporter vers Gmail avant de pouvoir les utiliser avec l'application.</li>
          </ul>
        </details>

        <details>
          <summary><strong>6. FAQ (Questions fréquentes)</strong></summary>
          
          <ul>
            <li><strong>Comment se connecter à Google ?</strong></li>
            <ul>
              <li>Sur la page <strong>Connexion</strong>, entrez votre email et votre mot de passe.</li>
              <li>Si vous utilisez Google pour la connexion, vous serez redirigé vers une page de Google pour autoriser l'accès aux informations de votre compte.</li>
            </ul>
            
            <li><strong>Que faire si un numéro est mal mis à jour ?</strong></li>
            <ul>
              <li>Si un numéro est incorrect après la mise à jour, vous pouvez le corriger manuellement ou vous assurer que vos contacts sont bien formatés avant d'exporter depuis Gmail.</li>
            </ul>
            
            <li><strong>Où trouver mes fichiers sauvegardés ?</strong></li>
            <ul>
              <li>Vos fichiers mis à jour sont stockés dans la section <strong>Paramètres</strong> de l'application. Vous pouvez les télécharger ou les supprimer à tout moment.</li>
            </ul>
          </ul>
        </details>

      </section>
    </div>
  );
};

export default HelpPage;
