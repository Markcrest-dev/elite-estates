import { useParams, useNavigate } from 'react-router-dom';
import { listings } from '../../data/listings';
import { agents } from '../../data/agents';
import PageTransition from '../../components/PageTransition';
import PhotoGallery from './PhotoGallery';
import PropertyStats from './PropertyStats';
import PropertyDescription from './PropertyDescription';
import AmenitiesList from './AmenitiesList';
import AgentContactCard from './AgentContactCard';
import SimilarListings from './SimilarListings';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === Number(id));

  if (!listing) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-estate-cream mb-4">Property Not Found</h1>
            <p className="text-estate-muted font-sans mb-8">The property you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/search')} className="bg-gold text-estate-dark px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors cursor-pointer">
              Browse Properties
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const agent = agents.find(a => a.id === listing.agentId) || agents[0];
  const similar = listings.filter(l => l.id !== listing.id).slice(0, 4);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <PhotoGallery images={listing.images} address={listing.address} />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <PropertyStats listing={listing} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-16">
            <div className="lg:col-span-2 space-y-12">
              <PropertyDescription description={listing.description} />
              <AmenitiesList amenities={listing.amenities} />
            </div>
            <div className="lg:col-span-1">
              <AgentContactCard agent={agent} listingId={listing.id} />
            </div>
          </div>
        </div>

        <SimilarListings listings={similar} />
      </div>
    </PageTransition>
  );
}
