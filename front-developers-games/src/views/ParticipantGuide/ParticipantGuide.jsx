import React from 'react';

import AppWrapper from '../../components/AppWrapper/AppWrapper';

function ParticipantGuide() {
  return (
    <AppWrapper title="Participant guide">
      <div className="terms">
        <div className="terms__group">
          <h3 className="terms__subtitle">Guide for participants</h3>
          <p className="terms__text">
            Each team will receive a link to an OpenShift cluster. This instance
            must be used to deploy the challenges during the entire
            competition.You will receive an email on the 27th to the email
            account used to register to the games.
          </p>
          <p className="terms__text">
            Teams will also be able to use CodeReady Workspaces if needed.
          </p>
          <p className="terms__text">
            To complete each challenge, teams should follow the instructions
            given on the challenge page. Challenges must be submitted in repo or
            .txt formats (depending on the exercise) via a github account. Other
            formats, such as images and screenshots, can be added. Here is a
            guide to
            {' '}
            <a
              href="https://www.youtube.com/user/GitHubGuides"
              target="_blank"
              rel="noreferrer"
            >
              getting started with github
            </a>
            .
          </p>
        </div>

        <div className="therms__group">
          <h3 className="terms__subtitle">Help is at hand!</h3>
          <p className="terms__text">
            Every great team needs support. We will provide training on the
            different technologies you will need to know to achieve the
            challenges we will propose. Ensure to register to the trainings on
            our web.
          </p>
          <p className="terms__text">
            If you like to fly solo, here are some coaching materials to give
            your team the best shot. And you can find more at
            {' '}
            <a
              href="https://developers.redhat.com/"
              target="_blank"
              rel="noreferrer"
            >
              https://developers.redhat.com/
            </a>
            .
          </p>
          <p className="terms__text">
            If you have questions during the Developer Games about the
            challenges or any other technical doubt, please join the Yammer
            Channel or write us at:
            {' '}
            <a href="mailto: developergamesEMEA@redhat.com?Subject=Contacto%20desde%20página%guía%20y%del%20participante">
              DevelopergamesEMEA@redhat.com
            </a>
            .
          </p>
        </div>

        <div className="terms__group">
          <h3 className="terms__subtitle">OpenShift:</h3>
          <ul className="terms__list">
            <li className="list__item">
              This
              {' '}
              <a
                href="https://github.com/cvicens/state-machine-assistant"
                target="_blank"
                rel="noreferrer"
              >
                OpenShift workshop
              </a>
              {' '}
              shows how to integrate different apps using
              {' '}
              <a
                href="https://developers.redhat.com/blog/2018/10/29/how-to-run-kafka-on-openshift-the-enterprise-kubernetes-with-amq-streams"
                target="_blank"
                rel="noreferrer"
              >
                Kafka
              </a>
              {' '}
              &
              {' '}
              <a
                href="https://developers.redhat.com/blog/2019/04/25/build-and-deploy-an-api-with-camel-k-on-red-hat-openshift"
                target="_blank"
                rel="noreferrer"
              >
                Camel K.
              </a>
              {' '}
              The project contains artifacts to deploy an app based on Angular
              like FrontEnd and a Node.js backend.
            </li>
            <li className="list__item">
              This
              {' '}
              <a
                href="https://www.openshift.com/blog/from-red-hat-developers-blog-using-a-custom-builder-image-on-red-hat-openshift-with-openshift-do"
                target="_blank"
                rel="noreferrer"
              >
                blog post
              </a>
              {' '}
              describes how to deploy an OpenShift from an image.
            </li>
            <li className="list__item">
              <a
                href="https://learn.openshift.com/"
                target="_blank"
                rel="noreferrer"
              >
                Quick user guides
              </a>
              {' '}
              for OpenShift.
            </li>
          </ul>
        </div>

        <div className="terms__group">
          <h3 className="terms__subtitle">Quarkus:</h3>
          <ul className="terms__list">
            <li className="list__item">
              <a
                href="https://developers.redhat.com/blog/2019/08/26/10-quarkus-videos-to-get-you-up-to-speed-with-supersonic-subatomic-java"
                target="_blank"
                rel="noreferrer"
              >
                Getting started in Quarkus
              </a>
            </li>

            <li className="list__item">
              <a
                href="https://developers.redhat.com/blog/2019/03/18/getting-started-with-codeready-workspaces-and-red-hat-openshift-application-runtimes"
                target="_blank"
                rel="noreferrer"
              >
                CodeReady Workspaces
              </a>
              , including information for those who want to work with CodeReady
              Workspaces for project development and deployment in OpenShift.
            </li>
          </ul>
        </div>

        <div className="terms__group">
          <h3 className="terms__subtitle">Datagrid</h3>
          <ul className="terms__list">
            <li className="list__item">
              <a
                href="https://access.redhat.com/documentation/en-us/red_hat_data_grid/8.2/"
                target="_blank"
                rel="noreferrer"
              >
                Data Grid documentation.
              </a>
            </li>
            <li className="list__item">
              <a
                href="https://github.com/redhat-developer/redhat-datagrid-tutorials"
                target="_blank"
                rel="noreferrer"
              >
                Data Grid tutorials.
              </a>
            </li>
            <li className="list__item">
              <a
                href="https://quarkus.io/guides/infinispan-client"
                target="_blank"
                rel="noreferrer"
              >
                Quarkus and Datagrid (Infinispan).
              </a>
            </li>
            <li className="list__item">
              <a
                href="https://github.com/infinispan-demos/harry-potter-quarkus/"
                target="_blank"
                rel="noreferrer"
              >
                Datagrid and Quarkus Demo
              </a>
            </li>
          </ul>
        </div>

        <div className="terms__group">
          <h3 className="terms__subtitle">Apache Kafka:</h3>
          <ul className="terms__list">
            <li className="list__item">
              <a
                href="https://strimzi.io/quickstarts/"
                target="_blank"
                rel="noreferrer"
              >
                Strimzi Quick Starts
              </a>
            </li>
            <li className="list__item">
              <a
                href="https://access.redhat.com/documentation/en-us/red_hat_amq/2021.q3/html/deploying_and_upgrading_amq_streams_on_openshift/index"
                target="_blank"
                rel="noreferrer"
              >
                Deploying and Upgrading AMQ Streams on OpenShift
              </a>
            </li>
            <li className="list__item">
              <a
                href="https://access.redhat.com/documentation/en-us/red_hat_amq/2021.q3/html/using_amq_streams_on_openshift/index"
                target="_blank"
                rel="noreferrer"
              >
                Using AMQ Streams on OpenShift
              </a>
            </li>
          </ul>
        </div>
      </div>
    </AppWrapper>
  );
}

export default ParticipantGuide;
