import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { BarChart, LineChart, PieChart, Share2, Printer, Mail, Download, Copy, X } from 'lucide-react'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

// Komponen ShareModal untuk menampilkan opsi berbagi
const ShareModal = ({ isOpen, onClose, onPrint, onEmail, onDownload, onCopyLink }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Share Report</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onPrint}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md"
          >
            <Printer size={20} className="text-gray-600" />
            <span>Print Report</span>
          </button>
          
          <button 
            onClick={onEmail}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md"
          >
            <Mail size={20} className="text-gray-600" />
            <span>Email Report</span>
          </button>
          
          <button 
            onClick={onDownload}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md"
          >
            <Download size={20} className="text-gray-600" />
            <span>Download as PDF</span>
          </button>
          
          <button 
            onClick={onCopyLink}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md"
          >
            <Copy size={20} className="text-gray-600" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('summary')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const stats = [
    { id: 1, label: 'Total Products', value: '28', change: '+12%', positive: true },
    { id: 2, label: 'Inquiries', value: '45', change: '+18%', positive: true },
    { id: 3, label: 'Connections', value: '12', change: '-3%', positive: false },
    { id: 4, label: 'Successful Trades', value: '8', change: '+4%', positive: true },
  ]

  const chartData = [
    { month: 'Jan', products: 12, inquiries: 20, connections: 5 },
    { month: 'Feb', products: 18, inquiries: 25, connections: 7 },
    { month: 'Mar', products: 17, inquiries: 30, connections: 9 },
    { month: 'Apr', products: 20, inquiries: 35, connections: 12 },
    { month: 'May', products: 22, inquiries: 40, connections: 8 },
    { month: 'Jun', products: 24, inquiries: 42, connections: 10 },
    { month: 'Jul', products: 23, inquiries: 38, connections: 11 },
    { month: 'Aug', products: 25, inquiries: 45, connections: 9 },
    { month: 'Sep', products: 28, inquiries: 47, connections: 13 },
    { month: 'Oct', products: 27, inquiries: 48, connections: 12 },
    { month: 'Nov', products: 29, inquiries: 49, connections: 14 },
    { month: 'Dec', products: 31, inquiries: 50, connections: 15 }
  ]
  
  const lineChartData = {
    labels: chartData.map(data => data.month),
    datasets: [
      {
        label: 'Products',
        data: chartData.map(data => data.products),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Inquiries',
        data: chartData.map(data => data.inquiries),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      }
    ]
  }

  const doughnutChartData = {
    labels: ['Connections from Suppliers', 'Connections from Buyers'],
    datasets: [
      {
        data: [70, 30], 
        backgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
      }
    ]
  }

  // Fungsi untuk menangani print
  const handlePrint = () => {
    const printContent = document.getElementById('overview-content');
    
    if (!printContent) {
      console.error("Content not found!");
      return;
    }
  
    // Membuka window baru untuk cetak
    const printWindow = window.open('', '', 'height=600,width=800');
  
    // Mengecek apakah printWindow berhasil terbuka
    if (printWindow) {
      printWindow.document.write('<html><head><title>Business Overview</title>');
      
      // Menambahkan CSS dari halaman utama ke print window
      const styles = Array.from(document.styleSheets).map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n');
  
      printWindow.document.write('<style>' + styles + '</style>');  // Masukkan semua CSS
  
      // Menulis konten dari elemen overview-content ke dalam print window
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      
      // Menutup dokumen dan memastikan konten selesai ditulis
      printWindow.document.close();
      
      // Menunggu sampai konten selesai dimuat, lalu memulai pencetakan
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      console.error("Failed to open the print window.");
    }
  }

  // Fungsi untuk menangani email
  const handleEmail = () => {
    const subject = encodeURIComponent("Business Overview Report");
    const body = encodeURIComponent("Here is your Business Overview Report.");
    
    // Buka aplikasi email default dengan subjek dan body yang sudah diisi
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Fungsi untuk download report sebagai PDF
  const handleDownloadPDF = async () => {
    try {
      // Di proyek nyata, ini akan menggunakan library seperti jsPDF atau html2pdf
      // Untuk contoh ini, hanya simulasi dengan timeout
      alert("Generating PDF...");
      
      // Simulasi delay untuk generasi PDF
      setTimeout(() => {
        alert("PDF Report has been downloaded successfully!");
      }, 1500);
      
      // Kode nyata untuk generasi PDF akan ditempatkan di sini
      // Contoh menggunakan html2pdf:
      // import html2pdf from 'html2pdf.js';
      // const element = document.getElementById('overview-content');
      // html2pdf().from(element).save('business-overview-report.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Fungsi untuk menyalin link report
  const handleCopyLink = () => {
    // Dalam aplikasi nyata, ini akan menyalin URL khusus untuk berbagi report
    // Untuk contoh ini, kita hanya menyalin URL halaman saat ini
    
    // Buat URL untuk berbagi (dalam aplikasi nyata ini akan mengarah ke URL report)
    const shareUrl = window.location.href + "?report=overview"; 
    
    // Salin ke clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert("Link report berhasil disalin!");
      })
      .catch(err => {
        console.error("Gagal menyalin link: ", err);
        alert("Gagal menyalin link. Silakan coba lagi.");
      });
  };

  return (
    <div className="space-y-6" id="overview-content">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Business Overview</h1>
        <Button 
          variant="secondary" 
          className="flex items-center gap-2" 
          onClick={() => setIsShareModalOpen(true)}
        >
          <Share2 size={18} />
          <span>Share Report</span>
        </Button>
      </div>

      {/* Modal Share */}
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onPrint={() => {
          setIsShareModalOpen(false);
          handlePrint();
        }}
        onEmail={() => {
          setIsShareModalOpen(false);
          handleEmail();
        }}
        onDownload={() => {
          setIsShareModalOpen(false);
          handleDownloadPDF();
        }}
        onCopyLink={() => {
          handleCopyLink();
          // Modal tetap terbuka dengan feedback visual yang dapat ditampilkan di handleCopyLink
        }}
      />

      {/* Account Type Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <p className="text-blue-700">
          You are logged in as a <span className="font-semibold">{user?.accountType === 'supplier' ? 'Supplier' : 'Buyer'}</span>.
          {user?.accountType === 'supplier' 
            ? ' Your dashboard is optimized to showcase your products and handle inquiries.' 
            : ' Your dashboard is optimized to discover products and make connections with suppliers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <p className="text-gray-500">{stat.label}</p>
              <span className={`text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'summary' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'connections' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Connections
            </button>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'summary' && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Activity Overview</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <Line data={lineChartData} height={100} />
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Product Analytics</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <Line data={lineChartData} height={100} />
                  <p className="mt-4 text-sm">Track product performance over time</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Connection Statistics</h3>
              <div className="h-50 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <Doughnut data={doughnutChartData} />
                  <p className="mt-4 text-sm">Distribution of connections between Suppliers and Buyers</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium text-gray-700 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 border-b border-gray-100">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-800">New inquiry received for your product "Premium Rice"</p>
              <p className="text-xs text-gray-500 mt-1">Today, 10:30 AM</p>
            </div>
          </div>
          <div className="flex items-start p-3 border-b border-gray-100">
            <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-800">Connection request accepted by "PT Maju Jaya"</p>
              <p className="text-xs text-gray-500 mt-1">Yesterday, 4:15 PM</p>
            </div>
          </div>
          <div className="flex items-start p-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-800">Your product "Organic Cassava" has been viewed 24 times</p>
              <p className="text-xs text-gray-500 mt-1">Apr 28, 2:45 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview