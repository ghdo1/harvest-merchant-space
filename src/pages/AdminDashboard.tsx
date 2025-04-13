
import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useAdminData } from '@/hooks/useAdminData';
import { AccessCheckingScreen } from '@/components/admin/AccessCheckingScreen';
import { AdminDashboardContent } from '@/components/admin/AdminDashboardContent';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { adminAccess, isCheckingAccess } = useAdminAccess(user);
  const { 
    products, 
    categories, 
    users, 
    loading, 
    fetchData, 
    fetchProducts,
    fetchCategories,
    fetchUsers
  } = useAdminData();
  
  // Fetch data when admin access is granted
  if (adminAccess && products.length === 0 && categories.length === 0 && users.length === 0) {
    fetchData();
  }

  return (
    <MainLayout>
      {isCheckingAccess || !adminAccess ? (
        <AccessCheckingScreen />
      ) : (
        <AdminDashboardContent
          users={users}
          products={products}
          categories={categories}
          loading={loading}
          onRefreshData={fetchData}
          onRefreshProducts={fetchProducts}
          onRefreshCategories={fetchCategories}
          onRefreshUsers={fetchUsers}
        />
      )}
    </MainLayout>
  );
};

export default AdminDashboard;
