// src/pages/Contact.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Navigation, Clock } from 'lucide-react'
import emailjs from 'emailjs-com'
import gsap from 'gsap'

const contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    firstMessage: '',
    address: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState('')
  const formRef = useRef(null)
  const contactRef = useRef(null)
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  const companyLocation = {
    lat: 11.3410,
    lng: 77.7172,
    address: 'SSS VENTURES, Pallipalayam, Erode - 638008'
  }

  useEffect(() => {
    gsap.fromTo(
      contactRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    if (window.google) initializeMap()
    else loadGoogleMapsScript()
  }, [])

  const loadGoogleMapsScript = () => {
    if (document.querySelector('script[src*="googleapis.com/maps"]')) return

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`
    script.async = true
    script.defer = true
    script.onload = initializeMap
    document.head.appendChild(script)
  }

  const initializeMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: companyLocation.lat, lng: companyLocation.lng },
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true
    })
    mapInstance.current = map
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setSendStatus('')

    try {
      await emailjs.send(
        'service_lypeaj9',
        'template_y5y0sjo',
        formData,
        'HHSIIqPbIn0pja9HG'
      )
      setSendStatus('success')
      setFormData({ name: '', email: '', firstMessage: '', address: '' })
    } catch (error) {
      setSendStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  const openLocationInMaps = () => {
    const url = `https://www.google.com/maps?q=${companyLocation.lat},${companyLocation.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div ref={contactRef} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Send us a Message
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with SSS Ventures for premium textile solutions and customized fabric manufacturing
            </p>
          </div>

          {/* Contact Form - Full Width */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              Contact Form
            </h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-700">
                  First Message *
                </label>
                <textarea
                  name="firstMessage"
                  value={formData.firstMessage}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50"
                  placeholder="Your initial message or inquiry..."
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-700">
                  Your Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50"
                  placeholder="Enter your complete address..."
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-5 rounded-xl font-semibold text-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl mt-6"
              >
                {isSending ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    Send Message
                  </>
                )}
              </button>

              {sendStatus === 'success' && (
                <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded-xl text-center text-lg">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {sendStatus === 'error' && (
                <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded-xl text-center text-lg">
                  ❌ Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information - Below the Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: 'Email',
                  content: 'sssventures6@gmail.com',
                  link: 'mailto:sssventures6@gmail.com',
                  description: 'Send us an email anytime'
                },
                {
                  icon: <Phone className="w-8 h-8" />,
                  title: 'Phone',
                  content: '+91 95855 19593',
                  link: 'tel:+919585519593',
                  description: 'Call us during business hours'
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: 'Address',
                  content: 'SSS VENTURES, Pallipalayam, Erode - 638008',
                  link: null,
                  description: 'Visit our location'
                }
              ].map((item, i) => (
                <div key={i} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 text-white rounded-xl flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-2 text-sm">
                    {item.description}
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-300 block"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-gray-700">{item.content}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-gray-600" />
                <h3 className="font-bold text-2xl text-gray-800">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-3 text-gray-600 max-w-md mx-auto">
                <div className="flex justify-between text-lg">
                  <span>Monday - Saturday</span>
                  <span className="font-semibold">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Sunday</span>
                  <span className="font-semibold text-red-600">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default contact