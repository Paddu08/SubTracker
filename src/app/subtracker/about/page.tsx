import React from "react";
import { Header } from "@/app/components/Header";

const AboutPage: React.FC = () => {
  return (
<div>
    <Header />
    <main className="max-w-4xl mx-auto px-6 py-12 font-sans text-gray-800">
       
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">About SubTrackr</h1>

      <section className="mb-10">
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-indigo-700">SubTrackr</span>, your easy-to-use subscription management tool designed to help you stay on top of all your recurring expenses.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What is SubTrackr?</h2>
        <p className="mb-4 leading-relaxed">
          In today’s world, subscriptions are everywhere — from streaming services and apps to memberships and utilities. SubTrackr makes it simple to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Keep track of all your subscriptions in one place</li>
          <li>Monitor billing cycles and renewal dates</li>
          <li>Spot price changes before they surprise you(R&D)</li>
          <li>Receive timely reminders so you never miss a payment</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Choose SubTrackr?</h2>
        <p className="leading-relaxed">
          SubTrackr puts you in control of your subscriptions, helping you save money and avoid unnecessary charges by giving you clear visibility and management tools.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Easily add and update your subscriptions</li>
          <li>Track pricing and plan changes over time</li>
          <li>Get notified about upcoming renewals and billing events</li>
          <li>Analyze your spending patterns monthly or yearly</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
        <p className="leading-relaxed">
          Your data is safe with us. SubTrackr is built with privacy and security in mind, ensuring your subscription details stay confidential.
        </p>
      </section>
    </main>
    </div>
  );
};

export default AboutPage;
