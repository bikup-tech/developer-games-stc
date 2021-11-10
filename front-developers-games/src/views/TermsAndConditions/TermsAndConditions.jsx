import React from 'react';

import './TermsAndConditions.scss';

// Components
import AppWrapper from '../../components/AppWrapper/AppWrapper';

function TermsAndConditions() {
  return (
    <AppWrapper title="Terms & Conditions">
      <div className="terms">
        <h3 className="terms__subtitle">Terms & Conditions</h3>
        <p className="terms__text">
          Rules for participation in the Santander & Red Hat Developer Games
          2021, which will take place from September 01 to October 10, 2021
          (including registration time frame, workshops and actual games). If
          you have questions or need additional information, please email to
          {' '}
          <br />
          <a href="mailto: developergamesEMEA@redhat.com?Subject=Contacto%20desde%20página%20términos%20y%20condiciones%20developerGames">
            developergamesEMEA@redhat.com
          </a>
          {' '}
          or
          {' '}
          <a href="mailto: manadon@redhat.com?Subject=Contacto%20desde%20página%20términos%20y%20condiciones%20developerGames">
            manadon@redhat.com
          </a>
          .
        </p>

        <div className="terms__group">
          <h3 className="terms__subtitle">Who organizes it?</h3>
          <p className="terms__text">Red Hat & Banco Santander</p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">Who can participate?</h3>
          <p className="terms__text">
            Only can participate Banco Santander employees.
            Participation is voluntary, and subject to approval from your manager.
          </p>
          <p className="terms__text">
            Participation is part of your employment, and as such you are
            expected to act in a responsible and appropriate manner, complying
            with regulations and personal and professional ethics expected by
            Banco Santander.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">How are the teams defined?</h3>
          <p className="terms__text">
            Teams must have a minimum of three and a maximum of four people.
            Each team must designate a Captain, who will be identified as such
            in the course of the competition. Though there is no rule around the
            composition of a team, it is advised that a combination of knowledge
            and skills will be valuable.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">How many teams will there be?</h3>
          <p className="terms__text">
            There will be a minimum of 10 and a maximum of 20 teams. In the
            event of more than 20 teams registering, selection will be made on a
            first-come-first-served basis.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">When can teams register?</h3>
          <p className="terms__text">
            The registration period will begin on September 01 , 2021 and will
            close on September 17, 2021 at 11:59 p.m.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">How does the competition work?</h3>
          <ul className="terms__list">
            <li className="list__item">
              Over the course of 2 weeks, teams will be tasked with completing 6
              challenges that require using Red Hat OpenShift and other technologies. See
              the full list of challenges here:
              {' '}
              <br />
              <a
                href="https://www.developergames.io/santander"
                target="_blank"
                rel="noreferrer"
              >
                https://www.developergames.io/santander
              </a>
            </li>
            <li className="list__item">
              Each challenge will last for between 1 and 5 hours, depending on ability,
              skills and knowledge but we will provide training if needed the week
              before the event starts.
            </li>
            <li className="list__item">
              Teams will be required to complete each task in a set timeframe (2 weeks) and
              in a dedicated environment (environments will be open 16h a day). (
              each team will receive access starting date).
            </li>
            <li className="list__item">
              Red Hat experts will be on hand to help out.
            </li>
            <li className="list__item">
              Each challenge will be uploaded on the web as request in
              its instructions.
            </li>
          </ul>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">
            When and where does the competition take place?
          </h3>
          <p className="terms__text">
            The competition starts on the 27th of september and ends the 10th of
            October. It is an online competition, though rooms at Red Hat or
            Banco Santander offices may be available on request. During the 2
            weeks of the competition, participants will be able to work at any
            time, in line with their job responsibilities and permissions from
            their manager.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">
            How do you ask questions during the competition?
          </h3>
          <p className="terms__text">
            A dedicated MS Teams Support chat will be shared with participants
            {' '}
            <a
              href="https://teams.microsoft.com/l/channel/19%3aVMnxgwa0nflBxB87AzUt1ptpTn1YanBlfAmqPwfB8yE1%40thread.tacv2/General?groupId=178f5d07-5a32-4359-873a-c29327d1d991&tenantId=35595a02-4d6d-44ac-99e1-f9ab4cd872db"
              target="_blank"
              rel="noreferrer"
            >
              (https://teams.microsoft.com/l/channel/19%3aVMnxgwa0nflBxB87AzUt1ptpTn1YanBlfAmqPwfB8yE1%40thread.tacv2/General?groupId=178f5d07-5a32-4359-873a-c29327d1d991&tenantId=35595a02-4d6d-44ac-99e1-f9ab4cd872db)
            </a>
            {' '}
            and you can also contact through this email DevelopergamesEMEA@redhat.com Support Email.

          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">What are the prizes?</h3>
          <ul className="terms__list--nopoint">
            <li className="list__item">1st position: Oculus Quest 2</li>
            <li className="list__item">2nd position: Nintendo switch lite</li>
            <li className="list__item">3rd position: Super Mario Lego set </li>
          </ul>
          <p className="terms__text">
            If the jury considers that the projects are not of sufficient quality or do
            not sufficiently conform to the evaluation criteria, prizes may be void.
          </p>
          <p className="terms__text">
            Prizes were already delivered to Santander España as the distribution
            relies on the internal guidelines of Santander.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">Who judges the entries?</h3>
          <p className="terms__text terms__text--nomargin">
            The judges on behalf of Red Hat will be: Mentors in each challenge
          </p>
          <p className="terms__text">
            The judges on behalf of Banco Santander will be: Openshift Santander
            Team members
          </p>
          <p className="terms__text">
            The judging panel is subject to change, and final names will be
            announced on the first day of the competition.
          </p>
        </div>
        {/*  */}
        <div className="terms__group">
          <h3 className="terms__subtitle">Evaluation Criteria</h3>
          <p className="terms__text">
            <span className="terms__text-title">Judges duty:</span>
            <br />
            You are responsible for helping us provide developers with feedback on the
            challenges as well as helping the organizers select winning projects
          </p>
          <p className="terms__text">
            <span className="terms__text-title">Judging Overview:</span>
            <br />
            Developers will submit their responses through the platform on the
            deliverable method state in each challenge.
          </p>
          <p className="terms__text">
            We will export a list of the Challenges from the platform to an
            excel sheet and give a number to each one.
          </p>
          <p className="terms__text">
            We will assign the complete set of a single challenge to each judge.
          </p>
          <p className="terms__text">
            Judges will review the documentation delivered to ensure the challenge
            was completed.
            If a challenge is not completed the challenge will not be evaluated.
          </p>
          <p className="terms__text">
            If it is, judges will review any relevant code or a link to GitHub or
            the platform or any other stuff requested by the mentor.
            Judges will rate each challenge they have been assigned under the following criteria:
          </p>
          <p className="terms__text">
            <span className="terms__text-title">Completion: </span>
            successfully complete the challenge.
          </p>
          <p className="terms__text">
            <span className="terms__text-title">Execution: </span>
            is the solution usable in its current state? Does everything appear to work?
          </p>
          <p className="terms__text">
            <span className="terms__text-title">Usefulness:  </span>
            is this something usable for other peers?
            Does the solution fulfill the goal?
          </p>
          <p className="terms__text">
            <span className="terms__text-title">Learning: </span>
            did the team stretch themselves? Did they apply what they
            learned during the available workshops or from the shared material?
          </p>
          <p className="terms__text">
            <span className="terms__text-title">Bonus: </span>
            were the bonus tasks completed successfully?
          </p>
          <p className="terms__text">
            These criteria will guide judges but ultimately judges will have the opportunity
            to give extra points to those 3 teams that have shown to be mindful of the available
            resources and how well executed bonus activities were performed.
          </p>
          <p className="terms__text">
            It&apos;s important to note that these judging criteria do not include:
            How good your code is. It doesn&apos;t matter
            if your code is messy, or not well commented,
            or uses inefficient algorithms.
            Developer Games is about playing around, making mistakes, and learning new things.
            If your code isn&apos;t production ready, we&apos;re not going to mark you down.
          </p>
          <p className="terms__text">
            We will average each team’s scores. The teams with the highest score will win the prize.
            No team can win more than one prize.
          </p>
        </div>
        {/*  */}
        <div className="terms__group">
          <h3 className="terms__subtitle">How will they score entries?</h3>
          <p className="terms__text">
            Judges will evaluate the proof of execution, optimization of
            resources, use of architecture concepts and display of technical
            skills. This will determine 90% of the score. 10% of the evaluation
            will be based on participation in the supporting workshops, and
            speed in completing the challenges.
          </p>
          <p className="terms__text">
            Bonus points are available in some challenges and they are not part
            of the initial 100% of the score but on top.
          </p>
          <p className="terms__text">
            For the judges to evaluate the challenges, they must be displayed on
            the platforms or uploaded in the repositories as indicated by each
            challenge.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">Confidentiality</h3>
          <p className="terms__text">
            The platform on which participants will be developing is owned by
            Red Hat and Banco Santander and therefore may contain confidential
            information and / or documentation. Participants must consider the
            confidentiality of these materials as per other materials that
            belong to the bank and to which access is given in order to carry
            out work.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">Personal data</h3>
          <p className="terms__text">
            Both during the course of the competition and at the subsequent
            awards ceremony, participants will be expected to appear in videos
            and photographs, which may be published in Banco Santander media
            channels. Banco Santander will save these images in accordance with
            current privacy and security regulations.
          </p>
          <p className="terms__text">
            Participants may exercise their rights of access, rectification,
            cancellation and opposition by sending an email to Benjamin
            Granados:
            {' '}
            <a href="mailto: benjamin.granados@gruposantander.com?Subject=Contacto%20desde%20página%20términos%20y%20condiciones%20developerGames">
              benjamin.granados@gruposantander.com
            </a>
          </p>
          <p className="terms__text">
            The participants also assign to Banco Santander the image rights
            that may derive from the photographs, videos and their dissemination
            by any means, including for advertising or promotional purposes,
            without having the right to any remuneration derived from their
            dissemination.
          </p>
          <p className="terms__text">
            At the end of the games no data will be stored by S&amp;D,
            Red Hat or any 3rd parties. All will be erased.
          </p>
        </div>
        <div className="terms__group">
          <h3 className="terms__subtitle">Compliance</h3>
          <p className="terms__text">
            In order to be designated as the winner of any of the prizes, it is
            necessary for the participants to comply with each and every one of
            these conditions. This document is subject to change for the proper
            functioning of the competition.
          </p>
        </div>
      </div>
    </AppWrapper>
  );
}

export default TermsAndConditions;
