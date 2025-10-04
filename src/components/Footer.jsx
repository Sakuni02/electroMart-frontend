function Footer() {
  return (
    <div className="grid lg:grid-cols-4 bg-gradient-to-r from-indigo-500 to-purple-500 px-20 py-10 justify-start items-start gap-8 text-white">
      {/* Brand Section */}
      <div className="col-span-1 space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_2px_black]">
          ElectroMart
        </h1>
        <p className="text-sm leading-relaxed">
          Your one-stop destination for the latest smartphones, gadgets, and
          accessories at unbeatable prices. Tech made simple, affordable, and
          reliable.
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-span-1 space-y-3">
        <h2 className="text-lg font-semibold">Quick Links</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="/about" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="/category/smartphones" className="hover:underline">
              Smartphones
            </a>
          </li>
          <li>
            <a href="/category/accessories" className="hover:underline">
              Accessories
            </a>
          </li>
          <li>
            <a href="/deals" className="hover:underline">
              Latest Deals
            </a>
          </li>
        </ul>
      </div>

      {/* Customer Support */}
      <div className="col-span-1 space-y-3">
        <h2 className="text-lg font-semibold">Customer Support</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="/help" className="hover:underline">
              Help Center
            </a>
          </li>
          <li>
            <a href="/shipping" className="hover:underline">
              Shipping & Delivery
            </a>
          </li>
          <li>
            <a href="/returns" className="hover:underline">
              Returns & Refunds
            </a>
          </li>
          <li>
            <a href="/faq" className="hover:underline">
              FAQs
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="col-span-1 space-y-3">
        <h2 className="text-lg font-semibold">Get in Touch</h2>
        <p className="text-sm">📍 Colombo, Sri Lanka</p>
        <p className="text-sm">📧 support@electromart.com</p>
        <p className="text-sm">📞 +94 77 123 4567</p>
        <div className="flex gap-3 mt-3">
          <a href="#" aria-label="Facebook" className="hover:opacity-80">
            🌐
          </a>
          <a href="#" aria-label="Instagram" className="hover:opacity-80">
            📸
          </a>
          <a href="#" aria-label="Twitter" className="hover:opacity-80">
            🐦
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer;
