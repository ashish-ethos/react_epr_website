import React, { useState, useEffect } from 'react';
import { Drawer, Button, Typography, Tag, InputNumber, Form, Tabs, Avatar, Progress } from 'antd';
import {
  CloseOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  CarOutlined,
  WifiOutlined,
  SecurityScanOutlined,
  ThunderboltOutlined,
  CalculatorOutlined,
  PhoneOutlined,
  UserOutlined,
  AreaChartOutlined,
  StarOutlined,
  BankOutlined
} from '@ant-design/icons';
import CustomButton from '../../components/ui/Button';
import { Facebook, Instagram, Linkedin, Twitter, X, Share2, Heart } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";
import ContactForm from '../Contact/ContactForm';
import './Project.css';

const { Title, Text } = Typography;

const ViewDetailsDrawer = ({ open, onClose, project, isLiked = false, onToggleLike }) => {
  const isCommercial = project?.type?.toLowerCase().includes('shop') || project?.type?.toLowerCase().includes('office');

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8);
  const [tenure, setTenure] = useState(120);
  const [emi, setEmi] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  useEffect(() => {
    if (project?.id) {
      const saved = localStorage.getItem(`shareCount_${project.id}`);
      setShareCount(saved ? parseInt(saved, 10) : 0);
    }
  }, [project?.id]);

  useEffect(() => {
    if (project?.id) {
      localStorage.setItem(`shareCount_${project.id}`, shareCount.toString());
    }
  }, [shareCount, project?.id]);

  const incrementShareCount = () => {
    setShareCount(prev => prev + 1);
  };

  useEffect(() => {
  }, [open, project, isLiked, onToggleLike]);

  const shareUrl = project ? encodeURIComponent(window.location.origin + `/projects/${isCommercial ? 'commercial' : 'residential'}/${project.name?.toLowerCase().replace(/\s+/g, '-')}`) : '';
  const shareTitle = project ? encodeURIComponent(project.name || 'Property') : 'Property';

  const socialMediaLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&display=popup&ref=plugin&src=share_button`,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'text-[#E4405F]',
      url: `https://www.instagram.com/ethosprorealtors/`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-[#0A66C2]',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}&source=Ethos%20Pro%20Realtors`,
    },
    {
      name: 'X',
      icon: Twitter,
      color: 'text-[#000000]',
      url: `https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}&via=ethosprorealtor`,
    },
    {
      name: 'WhatsApp',
      icon: BsWhatsapp,
      color: 'text-[#25D366]',
      url: `https://api.whatsapp.com/send?phone=918744964496&text=${shareTitle}%20${shareUrl}`,
    },
  ];

  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 100 / 12;
    const n = tenure;

    if (r === 0) {
      const emiValue = p / n;
      setEmi(emiValue.toFixed(2));
      setTotalAmount(p.toFixed(2));
      setTotalInterest(0);
    } else {
      const emiValue = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const total = emiValue * n;
      const interest = total - p;

      setEmi(emiValue.toFixed(2));
      setTotalAmount(total.toFixed(2));
      setTotalInterest(interest.toFixed(2));
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const handleEMISubmit = () => {
    calculateEMI();
  };

  const getMapUrl = () => {
    if (project?.addressMap) {
      const match = project.addressMap.match(/src="([^"]+)"/);
      return match ? match[1] : '#';
    }
    return '#';
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'parking': <CarOutlined />,
      'wifi': <WifiOutlined />,
      'pool': <CarOutlined />,
      'security': <SecurityScanOutlined />,
      'gym': <ThunderboltOutlined />,
      'default': <HomeOutlined />
    };

    const key = Object.keys(icons).find(k => amenity.toLowerCase().includes(k));
    return icons[key] || icons.default;
  };

  // const incrementShareCount = () => {
  //   setShareCount(prev => prev + 1);
  // };

  const PremiumCard = ({ children, className = '', gradient = false, hover = true }) => (
    <div
      className={`
    ${gradient
          ? 'bg-gradient-to-br from-[#333]/50 to-[#444]/50 border-2 border-[#ffffff38]'
          : 'bg-[#333] border border-[#ffffff38]'
        } 
      rounded-2xl shadow-lg 
      p-4 premium-card ${className}
    `}
    >
      {children}
    </div>

  );

  const StatCard = ({ icon, label, value, color = 'blue' }) => (
    <div className="text-center p-1 mobile-stat-grid">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${color}-100/20 text-${color}-600 mb-1 border-1`}>
        {icon}
      </div>
      <div className="text-xs text-[#c2c6cb]/80 mb-1">{label}</div>
      <div className="text-md font-bold text-[#c2c6cb]">{value}</div>
    </div>
  );

  const overviewContent = (
    <div className="space-y-6">
      {/* Hero Section */}
      <PremiumCard gradient={true} >
        <div className="flex justify-between items-start mb-4 hero-section-header">
          <div>
            <Title level={3} className="m-0 text-[#c2c6cb] fontFamily-bebas detail-project-name">{project?.name || 'Property'}</Title>
            <div className="flex items-center mt-2 text-[#c2c6cb]/80 fontFamily-bebas">
              <EnvironmentOutlined className="mr-2" />
              <Text>{project?.location || 'N/A'}</Text>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="p-2 bg-[#333]/90 rounded-full hover:bg-[#444] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (project?.id && onToggleLike) {
                  onToggleLike(project.id);
                } else {
                  console.error('Cannot toggle like: project.id or onToggleLike is missing');
                }
              }}
              disabled={!project?.id || !onToggleLike}
            >
              <Heart
                size={16}
                className={isLiked ? 'text-red-500 fill-red-500' : 'text-[#c2c6cb] hover:text-red-500'}
              />
            </button>
            <div className="relative flex items-center w-full">
              <button
                onClick={() => setIsSharePopupOpen(!isSharePopupOpen)}
                className="p-2 cursor-pointer bg-[#333]/90 rounded-full hover:bg-[#444] transition-colors"
              >
                <Share2 size={16} className="text-[#c2c6cb]" />
              </button>
              <span className="ml-2 text-sm flex gap-1 text-[#c2c6cb]/80 border-l border-[#ffffff38] pl-2 shadow-sm bg-[#333] rounded px-2 py-1 fontFamily-bebas">
                <p>{shareCount}</p>
                <p>{shareCount === 1 ? 'Share' : 'Shares'}</p>
              </span>
              {isSharePopupOpen && (
                <div className="absolute top-12 right-0 bg-[#444] rounded-lg shadow-xl w-40 z-50 border border-[#ffffff38]">
                  <div className="flex justify-between items-center px-2 py-1">
                    <h4 className="text-xs font-semibold text-[#c2c6cb]">Share Property</h4>
                    <button
                      onClick={() => setIsSharePopupOpen(false)}
                      className="p-1 hover:bg-[#333] rounded-full cursor-pointer transition-colors"
                    >
                      <X size={16} className="text-[#c2c6cb]" />
                    </button>
                  </div>
                  <div className="flex flex-col mb-1 gap-1">
                    {socialMediaLinks.map((platform) => (
                      <button
                        key={platform.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementShareCount();
                          window.open(platform.url, '_blank', 'noopener,noreferrer');
                          setIsSharePopupOpen(false);
                        }}
                        className="flex items-center gap-2 p-1 px-2 hover:bg-[#333] rounded-lg transition-colors"
                      >
                        <platform.icon size={16} className={platform.color} />
                        <span className="text-xs text-[#c2c6cb] font-[Inter] ml-1">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project?.status?.map((status, idx) => (
            <Tag key={idx} className={`
              px-4 py-2 rounded-full fontFamily-content font-semibold text-[#c2c6cb] border border-[#ffffff38] bg-[#333]/50
            `}>
              {status}
            </Tag>
          ))}
        </div>

        <div className="flex items-baseline gap-2">
          <Title level={4} className="m-0 text-[#c2c6cb]">{formatPrice(project?.price)}</Title>
          {project?.pricePerSqft && (
            <Text className="text-[#c2c6cb]/80 text-lg">{project.pricePerSqft}/sqft</Text>
          )}
        </div>
      </PremiumCard>

      {/* Key Statistics */}
      <PremiumCard>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#ffffff38] mobile-stat-grid">
          <StatCard
            icon={<AreaChartOutlined className="text-[#c2c6cb]" />}
            label="Area"
            value={project?.sqft || 'On Request'}
            color="blue"
            className="text-sm font-medium font-[Inter] text-[#c2c6cb]"
          />
          <StatCard
            icon={<HomeOutlined className="text-[#c2c6cb]" />}
            label="Type"
            value={project?.type || 'N/A'}
            color="green"
            className="font-medium text-[#c2c6cb] font-[Inter]"
          />
          {!isCommercial && (
            <>
              <StatCard
                icon={<UserOutlined className="text-[#c2c6cb]" />}
                label="Bedrooms"
                value={typeof project?.bedrooms === 'object' ? `${project.bedrooms.min || 0}-${project.bedrooms.max || 0} Beds` : (project?.bedrooms || 'N/A')}
                color="purple"
              />
              <StatCard
                icon={<ThunderboltOutlined className="text-[#c2c6cb]" />}
                label="Bathrooms"
                value={typeof project?.bathrooms === 'object' ? `${project.bathrooms.min || 0}-${project.bathrooms.max || 0} Baths` : (project?.bathrooms || 'N/A')}
                color="orange"
              />
            </>
          )}
          {isCommercial && (
            <>
              <StatCard
                icon={<BankOutlined className="text-[#c2c6cb]" />}
                label="Category"
                value={project?.category?.replace('_', ' ') || 'N/A'}
                color="purple"
              />
              <StatCard
                icon={<StarOutlined className="text-[#c2c6cb]" />}
                label="Rating"
                value={project?.rating || 'N/A'}
                color="orange"
              />
            </>
          )}
        </div>
      </PremiumCard>

      {/* Property Image */}
      {project?.image && (
        <PremiumCard className="p-0 overflow-hidden">
          <div className="relative">
            <img
              src={project.image}
              alt={project.name || 'Property'}
              className="w-full h-80 object-cover premium-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#333]/20 to-transparent" />
          </div>
        </PremiumCard>
      )}

      {/* Amenities */}
      {project?.amenities?.length > 0 && (
        <PremiumCard>
          <Title level={4} className="mb-4 flex fontFamily-bebas items-center text-[#c2c6cb]">
            <ThunderboltOutlined className="mr-2 text-[#c2c6cb]" />
            Amenities & Features
          </Title>
          <div className="grid grid-cols-2 mt-2 sm:grid-cols-3 gap-4 mobile-amenities-grid">
            {project.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center p-3 bg-[#333]/50 rounded-xl hover:bg-[#444]/50 transition-colors border border-[#ffffff38]">
                <div className="mr-3 text-[#c2c6cb]">
                  {getAmenityIcon(amenity)}
                </div>
                <Text className="font-medium text-[#c2c6cb]">{amenity}</Text>
              </div>
            ))}
          </div>
        </PremiumCard>
      )}

      {/* Map */}
      {project?.addressMap && (
        <PremiumCard>
          <Title level={4} className="mb-4 flex fontFamily-bebas items-center text-[#c2c6cb]">
            <EnvironmentOutlined className="mr-2 text-[#c2c6cb]" />
            Location
          </Title>
          <a href={getMapUrl()} target="_blank" rel="noopener noreferrer">
            <div
              className="w-full h-64 mt-2 rounded-xl overflow-hidden hover:opacity-90 transition-opacity shadow-inner"
              dangerouslySetInnerHTML={{ __html: project.addressMap }}
            />
          </a>
        </PremiumCard>
      )}
    </div>
  );

  const calculatorContent = (
    <div className="space-y-6">
      <PremiumCard gradient={true}>
        <Title level={4} className="mb-6 flex items-center text-[#c2c6cb] emi-title-text">
          <CalculatorOutlined className="mr-3 text-[#c2c6cb]" />
          EMI Calculator
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            const loanAmountVal = Number(values.loanAmount);
            const interestRateVal = Number(values.interestRate);
            const tenureVal = Number(values.tenure);

            // Saving to state (optional if you want to show in results)
            setLoanAmount(loanAmountVal);
            setInterestRate(interestRateVal);
            setTenure(tenureVal);

            const p = loanAmountVal;
            const r = interestRateVal / 100 / 12;
            const n = tenureVal;

            if (r === 0) {
              const emiValue = p / n;
              setEmi(emiValue.toFixed(2));
              setTotalAmount(p.toFixed(2));
              setTotalInterest(0);
            } else {
              const emiValue = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
              const total = emiValue * n;
              const interest = total - p;

              setEmi(emiValue.toFixed(2));
              setTotalAmount(total.toFixed(2));
              setTotalInterest(interest.toFixed(2));
            }
          }}
          initialValues={{
            loanAmount,
            interestRate,
            tenure,
          }}
        >
          <div className="grid sm:grid-cols-3 gap-6 emi-form-grid mt-2">
            <Form.Item
              name="loanAmount"
              label={<span className="flex items-center gap-1"><Text strong className="text-[#c2c6cb]">Loan Amount</Text></span>}
              rules={[{ required: true, message: 'Please enter loan amount' }]}
            >
              <InputNumber
                min={100000}
                max={100000000}
                className="w-full"
                size="large"
                formatter={(val) => `₹ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(val) => val.replace(/₹\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="interestRate"
              label={<span className="flex items-center gap-1"><Text strong className="text-[#c2c6cb]">Interest Rate (%)</Text></span>}
              rules={[{ required: true, message: 'Please enter interest rate' }]}
            >
              <InputNumber min={1} max={20} step={0.1} className="w-full" size="large" />
            </Form.Item>

            <Form.Item
              name="tenure"
              label={<span className="flex items-center gap-1"><Text strong className="text-[#c2c6cb]">Tenure (Months)</Text></span>}
              rules={[{ required: true, message: 'Please enter tenure' }]}
            >
              <InputNumber min={12} max={360} className="w-full" size="large" />
            </Form.Item>
          </div>

          <Form.Item>
            <div className='w-full flex justify-center'>
              <CustomButton
                type="primary"
                htmlType="submit"
                size="large"
                className="h-12 rounded-xl bg-gradient-to-r from-[#c2c6cb]/20 to-[#444]/20 border border-[#ffffff38] font-semibold shadow-lg hover:shadow-xl text-[#c2c6cb]"
              >
                Calculate EMI
              </CustomButton>
            </div>
          </Form.Item>
        </Form>
      </PremiumCard>

      {/* Show result only after submit */}
      {emi !== null && (
        <PremiumCard>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-[#333]/50 to-[#444]/50 rounded-2xl border border-[#ffffff38]">
              <div className="text-xl font-bold text-[#c2c6cb] mb-2">₹ {formatPrice(emi)}</div>
              <div className="text-[#c2c6cb] font-medium">Monthly EMI</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-[#333]/50 to-[#444]/50 rounded-2xl border border-[#ffffff38]">
              <div className="text-xl font-bold text-[#c2c6cb] mb-2">₹ {formatPrice(totalAmount)}</div>
              <div className="text-[#c2c6cb] font-medium">Total Amount</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-[#333]/50 to-[#444]/50 rounded-2xl border border-[#ffffff38]">
              <div className="text-xl font-bold text-[#c2c6cb] mb-2">₹ {formatPrice(totalInterest)}</div>
              <div className="text-[#c2c6cb] font-medium">Total Interest</div>
            </div>
          </div>
        </PremiumCard>
      )}
    </div>
  );



  const contactContent = (
    <PremiumCard className='p-0 m-0'>
      <ContactForm className="p-0 m-0" />
    </PremiumCard>
  );

  const tabItems = [
    {
      key: 'overview',
      label: (
        <span className="flex items-center text-[#c2c6cb]">
          <HomeOutlined className="mr-2" />
          Overview
        </span>
      ),
      children: <div className="pb-6">{overviewContent}</div>,
    },
    {
      key: 'calculator',
      label: (
        <span className="flex items-center text-[#c2c6cb]">
          <CalculatorOutlined className="mr-2" />
          EMI Calculator
        </span>
      ),
      children: <div className="pb-6">{calculatorContent}</div>,
    },
    {
      key: 'contact',
      label: (
        <span className="flex items-center text-[#c2c6cb]">
          <PhoneOutlined className="mr-2" />
          Contact
        </span>
      ),
      children: <div className="pb-6">{contactContent}</div>,
    },
  ];

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={open}
      width={800}
      styles={{
        body: { padding: 0, background: '#333' },
        header: { display: 'none' }
      }}
      className="advanced-drawer scrollbars-thin"
    >
      <div className="h-full bg-gradient-to-br from-[#333] to-[#444]">
        {/* Custom Header */}
        <div className="bg-[#444] border-b border-[#ffffff38] p-2 sticky top-0 z-10 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 mr-3">
              <Avatar size={40} className="bg-[#333]">
                {project?.name?.charAt(0) || 'P'}
              </Avatar>
              <div className='px-2'>
                <p className="m-0 p-0 text-lg font-medium fontFamily-bebas drawer-title text-[#c2c6cb]">{project?.name || 'Property Details'}</p>
                <Text className="text-[#c2c6cb]/80 m-0 p-0 fontFamily-bebas">Premium Listing</Text>
              </div>
            </div>
            <Button
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={onClose}
              className="border border-1 hover:bg-red-500 hover:border-red-500 close-icons-project"
              size="large"

            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="px-6 pt-4">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="advanced-tabs"
            size="large"
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ViewDetailsDrawer;