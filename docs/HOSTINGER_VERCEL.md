# Hostinger DNS Configuration for Vercel Domains

This document outlines the DNS configuration required to connect Hostinger-managed domains to Vercel
applications.

## Overview

| Domain                 | Vercel App                     | Status        |
| --- | --- | --- |
| `bestitconsultants.ca` | `bestitconsultants.vercel.app` | ✅ Configured |
| `bestitconsulting.ca`  | `bestitconsultants.ca`         | ✅ Configured |

## DNS Configuration Details

### Domain 1: bestitconsultants.ca

**Hostinger Panel:** https://hpanel.hostinger.com/domain/bestitconsultants.ca/dns

#### Required DNS Records:

| Type  | Name | Value                  | TTL   | Purpose                 |
| --- | --- | --- | --- | --- |
| A     | @    | `76.76.21.21`          | 14400 | Root domain to Vercel   |
| CNAME | www  | `cname.vercel-dns.com` | 14400 | WWW subdomain to Vercel |

#### Configuration Steps:

1. Log into Hostinger DNS panel
2. **Delete** existing A record pointing to `216.198.79.1`
3. **Add** new A record: `@ → 76.76.21.21`
4. **Add** CNAME record: `www → cname.vercel-dns.com`

---

### Domain 2: bestitconsulting.ca

**Hostinger Panel:** https://hpanel.hostinger.com/domain/bestitconsulting.ca/dns **Vercel App:**
`bestitconsultants.ca`

#### Required DNS Records:

| Type  | Name | Value                                 | TTL   | Purpose                                      |
| --- | --- | --- | --- | --- |
| A     | @    | `76.76.21.21`                         | 14400 | Root domain to Vercel                        |
| CNAME | www  | `128f30c0bdb20f4e.vercel-dns-017.com` | 300   | WWW subdomain to Vercel (already configured) |

#### Configuration Steps:

1. Log into Hostinger DNS panel
2. **Edit** existing A record from `216.198.79.1` to `76.76.21.21`
3. **Keep** existing CNAME record (already correctly configured)

## Verification Commands

After making DNS changes, verify the configuration using these commands:

### Check bestitconsultants.ca:

```bash
# Check root domain
dig bestitconsultants.ca A
# Expected: 76.76.21.21

# Check www subdomain
dig www.bestitconsultants.ca CNAME
# Expected: cname.vercel-dns.com
```

### Check bestitconsulting.ca:

```bash
# Check root domain
dig bestitconsulting.ca A
# Expected: 76.76.21.21

# Check www subdomain
dig www.bestitconsulting.ca CNAME
# Expected: 128f30c0bdb20f4e.vercel-dns-017.com
```

## Vercel Official DNS Records

### Standard Vercel A Records:

- Primary: `76.76.21.21`
- Secondary: `76.76.21.164`

### Standard Vercel CNAME:

- Target: `cname.vercel-dns.com`

## Troubleshooting

### Common Issues:

1. **"Invalid Configuration" in Vercel Dashboard**
   - Verify DNS records are correctly pointing to Vercel IPs
   - Wait for DNS propagation (15-30 minutes)
   - Check for conflicting DNS records

2. **DNS Propagation Delays**
   - Changes can take up to 48 hours globally
   - Use online DNS checkers to monitor propagation
   - Clear local DNS cache if needed

3. **SSL Certificate Issues**
   - Vercel automatically issues SSL certificates once DNS is correctly configured
   - May take a few minutes after domain validation

### Verification Tools:

- **DNS Checker:** https://dnschecker.org/
- **Dig Command:** Built into terminal
- **Vercel Dashboard:** Check domain status under Project Settings → Domains

## DNS Propagation Timeline

| Time           | Expected Status                    |
| --- | --- |
| 0-15 minutes   | DNS changes applied to Hostinger   |
| 15-30 minutes  | Most regions updated               |
| 30-60 minutes  | Global propagation mostly complete |
| Up to 48 hours | Full global propagation guaranteed |

## Support Resources

- **Vercel DNS Documentation:** https://vercel.com/docs/domains
- **Hostinger DNS Help:** https://support.hostinger.com/
- **DNS Troubleshooting:** https://vercel.com/docs/domains/troubleshooting

---

## Configuration History

### Before Changes:

- `bestitconsultants.ca` → `216.198.79.1` (incorrect)
- `bestitconsulting.ca` → `216.198.79.1` (incorrect)

### After Changes:

- `bestitconsultants.ca` → `76.76.21.21` (correct Vercel IP)
- `bestitconsulting.ca` → `76.76.21.21` (correct Vercel IP)

**Last Updated:** July 26, 2025 **Configuration Status:** ✅ Complete
