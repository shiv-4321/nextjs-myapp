import React, { Fragment, useEffect, useState } from 'react'
import MeetupList from '../components/meetups/MeetupList';

import { MongoClient } from 'mongodb';
import Head from 'next/head';


function HomePage(props) {
    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta
                name='description'
                content='Browse a list of React Meetups!'
            />
        </Head>
        <MeetupList meetups={props.meetups} />

    </Fragment>
}


// Static Generation Concept (Server side rendering/pre-rendering)
export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect('mongodb+srv://shiv_prakash:cpMbsYkdAHdwIXoc@cluster0.yfluptj.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10 // data changes in every 10 seconds (gets updated with the new data for every request) 
    };
}


// export async function getServerSideProps(context) {

//     // extra data/information (req and res objects)
//     const req = context.req;
//     const res = context.res;

//     // any code here, runs on the server
//     // fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;