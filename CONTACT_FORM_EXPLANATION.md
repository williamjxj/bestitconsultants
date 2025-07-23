# Contact Form Field Requirements & Email Flow

## Field Classification (Following requirements.prompt.md)

Based on the current implementation in `/contact` page, here are the field requirements:

### **MANDATORY FIELDS** ⚠️ (Required)

These fields have **both** frontend validation (`required` attribute) **and** backend validation:

1. **📝 Full Name** (`name`)

   - Frontend: `<Input required>`
   - Backend: `if (!name || !email || !message)`
   - Purpose: Customer identification

2. **📧 Email Address** (`email`)

   - Frontend: `<Input type="email" required>`
   - Backend: `if (!name || !email || !message)`
   - Purpose: Contact information and auto-reply destination
   - **IMPORTANT:** This is the CUSTOMER'S email, not the business email

3. **💬 Project Details** (`message`)
   - Frontend: `<Textarea required>`
   - Backend: `if (!name || !email || !message)`
   - Purpose: Understanding customer needs

### **OPTIONAL FIELDS** ✅ (Not Required)

These fields enhance the submission but are not mandatory:

4. **🏢 Company** (`company`)

   - Frontend: `<Input>` (no required attribute)
   - Backend: `${company || 'Not provided'}`
   - Purpose: Business context

5. **📱 Phone Number** (`phone`)

   - Frontend: `<Input>` (no required attribute)
   - Backend: `${phone || 'Not provided'}`
   - Purpose: Alternative contact method

6. **🛠️ Service Needed** (`service`)

   - Frontend: `<Select>` (no required attribute)
   - Backend: `${service || 'Not specified'}`
   - Options: Web Development, Mobile Development, Cloud Solutions, AI/ML Services, Technical
     Consulting, Other

7. **💰 Project Budget** (`budget`)

   - Frontend: `<Select>` (no required attribute)
   - Backend: `${budget || 'Not specified'}`
   - Options: $5K-$10K, $10K-$25K, $25K-$50K, $50K-$100K, $100K+

8. **⏱️ Project Timeline** (`timeline`)

   - Frontend: `<Select>` (no required attribute)
   - Backend: `${timeline || 'Not specified'}`
   - Options: ASAP, 1-3 months, 3-6 months, 6-12 months, 12+ months

9. **📬 Newsletter Subscription** (`newsletter`)
   - Frontend: `<Checkbox>` (optional by nature)
   - Backend: `${newsletter ? 'Yes' : 'No'}`
   - Purpose: Marketing consent

```
CUSTOMER FILLS FORM:
┌─────────────────────────────────┐
│ Name: John Doe                  │
│ Email: johndoe@example.com  ←── │ This is the CUSTOMER'S email
│ Company: ABC Corp               │
│ Message: I need a website...    │
└─────────────────────────────────┘
                 │
                 ▼ SUBMITS FORM

TWO EMAILS ARE SENT:

1. TO BUSINESS OWNER (YOU):
   FROM: BestITConsulting <onboarding@resend.dev>
   TO: jxjwilliam@gmail.com  ←── RECEIVER (Your business email)
   REPLY-TO: johndoe@example.com
   SUBJECT: New Contact Form Submission from John Doe

2. TO CUSTOMER (AUTO-REPLY):
   FROM: BestITConsulting <onboarding@resend.dev>
   TO: johndoe@example.com  ←── CUSTOMER gets confirmation
   REPLY-TO: jxjwilliam@gmail.com
   SUBJECT: Thank you for contacting BestITConsulting
```

## **Who Gets What Emails?**

### **Business Owner (You) Receives:**

- **Email TO:** `jxjwilliam@gmail.com` (configured in BUSINESS_EMAIL env var)
- **Contains:** Customer's contact info, project details, and message
- **Reply-To:** Customer's email address (so you can reply directly)

### **Customer Receives:**

- **Email TO:** Whatever email they entered in the form
- **Contains:** Thank you message, next steps, your contact info
- **Reply-To:** Your business email (jxjwilliam@gmail.com)

## **Configuration Summary**

### **Environment Variables (.env):**

```bash
# Where business notifications are sent TO
BUSINESS_EMAIL="jxjwilliam@gmail.com"

# API key for sending emails
RESEND_API_KEY="re_azAhdY7r_HBcqg14GDsmUMbjw8rmWh756"
```

### **Form Field Labels:**

- **"Email Address"** = Customer's email (where they want replies)
- **NOT** = Where emails are sent to (that's configured in env vars)

## **Why This Design?**

1. **Customer Input:** They provide their email so you can respond
2. **Business Receives:** All inquiries go to your configured business email
3. **Auto-Confirmation:** Customer gets immediate acknowledgment
4. **Easy Replies:** Both sides can reply directly via email

## **Example Scenario:**

1. **Sarah from TechCorp** visits your website
2. She fills out:
   - Name: Sarah Johnson
   - **Email: sarah@techcorp.com** ← This is what she enters
   - Message: "Need an e-commerce site"
3. **You receive** email at `jxjwilliam@gmail.com` with her details
4. **She receives** confirmation at `sarah@techcorp.com`
5. **You reply** to the email and it goes to `sarah@techcorp.com`

## **The "Email Address" field is for the CUSTOMER to enter THEIR email, not yours!**

Your receiving email is configured separately in the environment variables and is not visible to
website visitors.
